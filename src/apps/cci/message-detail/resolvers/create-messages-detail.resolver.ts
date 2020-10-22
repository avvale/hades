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
import { CreateMessagesDetailCommand } from '@hades/cci/message-detail/application/create/create-messages-detail.command';
import { CciCreateMessageDetailInput } from './../../../../graphql';

@Resolver()
@Permissions('cci.messageDetail.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CreateMessagesDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciCreateMessagesDetail')
    @TenantPolicy()
    async main(@CurrentAccount() account: AccountResponse, @Args('payload') payload: CciCreateMessageDetailInput[])
    {
        await this.commandBus.dispatch(new CreateMessagesDetailCommand(payload));
        return true;
    }
}