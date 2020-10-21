import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantPolicy } from './../../../shared/decorators/tenant-policy.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateRoleCommand } from '@hades/cci/role/application/create/create-role.command';
import { FindRoleByIdQuery } from '@hades/cci/role/application/find/find-role-by-id.query';
import { CciCreateRoleInput } from './../../../../graphql';

@Resolver()
@Permissions('cci.role.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CreateRoleResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciCreateRole')
    @TenantPolicy()
    async main(@CurrentAccount() account: AccountResponse, @Args('payload') payload: CciCreateRoleInput)
    {
        await this.commandBus.dispatch(new CreateRoleCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.name,
        ));
        
        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id));
    }
}