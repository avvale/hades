import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { TenantPolicy } from '@hades/iam/shared/domain/decorators/tenant-policy.decorator';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateChannelDetailCommand } from '@hades/cci/channel-detail/application/create/create-channel-detail.command';
import { FindChannelDetailByIdQuery } from '@hades/cci/channel-detail/application/find/find-channel-detail-by-id.query';
import { CciCreateChannelDetailInput } from './../../../../graphql';

@Resolver()
@Permissions('cci.channelDetail.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateChannelDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('cciCreateChannelDetail')
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Args('payload') payload: CciCreateChannelDetailInput,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateChannelDetailCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindChannelDetailByIdQuery(payload.id, {}, { timezone }));
    }
}