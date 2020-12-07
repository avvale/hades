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
import { UpdateAdministrativeAreaLevel3Command } from '@hades/admin/administrative-area-level-3/application/update/update-administrative-area-level-3.command';
import { FindAdministrativeAreaLevel3ByIdQuery } from '@hades/admin/administrative-area-level-3/application/find/find-administrative-area-level-3-by-id.query';
import { AdminUpdateAdministrativeAreaLevel3Input } from './../../../../graphql';

@Resolver()
@Permissions('admin.administrativeAreaLevel3.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminUpdateAdministrativeAreaLevel3Resolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('adminUpdateAdministrativeAreaLevel3')
    async main(
        @Args('payload') payload: AdminUpdateAdministrativeAreaLevel3Input,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateAdministrativeAreaLevel3Command(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel3ByIdQuery(payload.id, constraint, { timezone }));
    }
}