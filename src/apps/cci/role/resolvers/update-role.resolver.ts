import { Resolver, Args, Mutation } from '@nestjs/graphql';

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
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateRoleCommand } from '@hades/cci/role/application/update/update-role.command';
import { FindRoleByIdQuery } from '@hades/cci/role/application/find/find-role-by-id.query';
import { CciUpdateRoleInput } from './../../../../graphql';

@Resolver()
@Permissions('cci.role.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class UpdateRoleResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciUpdateRole')
    @TenantConstraint()
    async main(@CurrentAccount() account: AccountResponse, @Args('payload') payload: CciUpdateRoleInput, @Args('constraint') constraint?: QueryStatement, )
    {
        await this.commandBus.dispatch(new UpdateRoleCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.name,
            constraint,
        ));
        
        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id, constraint));
    }
}