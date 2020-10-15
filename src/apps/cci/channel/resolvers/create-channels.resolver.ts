import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthGraphQLJwtGuard } from './../../../shared/modules/auth/guards/auth-graphql-jwt.guard';
import { AuthorizationGraphQLGuard } from './../../../shared/modules/auth/guards/authorization-graphql.guard';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateChannelsCommand } from '@hades/cci/channel/application/create/create-channels.command';
import { CciCreateChannelInput } from './../../../../graphql';

@Resolver()
@Permissions('cci.channel.create')
@UseGuards(AuthGraphQLJwtGuard, AuthorizationGraphQLGuard)
export class CreateChannelsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciCreateChannels')
    async main(@CurrentAccount() account: AccountResponse, @Args('payload') payload: CciCreateChannelInput[])
    {
        await this.commandBus.dispatch(new CreateChannelsCommand(payload));
        return true;
    }
}