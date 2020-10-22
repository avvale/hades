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
import { CreateModulesCommand } from '@hades/cci/module/application/create/create-modules.command';
import { CciCreateModuleInput } from './../../../../graphql';

@Resolver()
@Permissions('cci.module.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CreateModulesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciCreateModules')
    @TenantPolicy()
    async main(@CurrentAccount() account: AccountResponse, @Args('payload') payload: CciCreateModuleInput[])
    {
        await this.commandBus.dispatch(new CreateModulesCommand(payload));
        return true;
    }
}