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
import { FindRoleByIdQuery } from '@hades/cci/role/application/find/find-role-by-id.query';
import { DeleteRoleByIdCommand } from '@hades/cci/role/application/delete/delete-role-by-id.command';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('cci.role.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciDeleteRoleByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('cciDeleteRoleById')
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const role = await this.queryBus.ask(new FindRoleByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteRoleByIdCommand(id, constraint, { timezone }));

        return role;
    }
}