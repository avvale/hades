import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateCountryCommand } from '@hades/admin/country/application/update/update-country.command';
import { FindCountryByIdQuery } from '@hades/admin/country/application/find/find-country-by-id.query';
import { AdminUpdateCountryInput } from './../../../../graphql';

@Resolver()
@Permissions('admin.country.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminUpdateCountryResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('adminUpdateCountry')
    async main(
        @Args('payload') payload: AdminUpdateCountryInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateCountryCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindCountryByIdQuery(payload.id, constraint, { timezone }));
    }
}