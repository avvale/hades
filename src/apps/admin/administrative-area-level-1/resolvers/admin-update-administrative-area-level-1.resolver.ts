import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateAdministrativeAreaLevel1Command } from '@hades/admin/administrative-area-level-1/application/update/update-administrative-area-level-1.command';
import { FindAdministrativeAreaLevel1ByIdQuery } from '@hades/admin/administrative-area-level-1/application/find/find-administrative-area-level-1-by-id.query';
import { AdminUpdateAdministrativeAreaLevel1Input } from './../../../../graphql';

@Resolver()
@Permissions('admin.administrativeAreaLevel1.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminUpdateAdministrativeAreaLevel1Resolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('adminUpdateAdministrativeAreaLevel1')
    async main(
        @Args('payload') payload: AdminUpdateAdministrativeAreaLevel1Input,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateAdministrativeAreaLevel1Command(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindAdministrativeAreaLevel1ByIdQuery(payload.id, constraint, { timezone }));
    }
}