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
import { TenantPolicy } from './../../../shared/decorators/tenant-policy.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateModuleCommand } from '@hades/cci/module/application/create/create-module.command';
import { FindModuleByIdQuery } from '@hades/cci/module/application/find/find-module-by-id.query';
import { CciCreateModuleInput } from './../../../../graphql';

@Resolver()
@Permissions('cci.module.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateModuleResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('cciCreateModule')
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('payload') payload: CciCreateModuleInput,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateModuleCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindModuleByIdQuery(payload.id));
    }
}