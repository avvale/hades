import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantConstraint } from './../../../shared/decorators/tenant-constraint.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { DeleteSystemsCommand } from '@hades/cci/system/application/delete/delete-systems.command';
import { GetSystemsQuery } from '@hades/cci/system/application/get/get-systems.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('cci.system.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciDeleteSystemsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('cciDeleteSystems')
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const systems = await this.queryBus.ask(new GetSystemsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteSystemsCommand(queryStatement, constraint, { timezone }));

        return systems;
    }
}