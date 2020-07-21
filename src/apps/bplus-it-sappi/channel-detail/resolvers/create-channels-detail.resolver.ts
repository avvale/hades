import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateChannelDetailInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateChannelsDetailCommand } from '@hades/bplus-it-sappi/channel-detail/application/create/create-channels-detail.command';

@Resolver()
export class CreateChannelsDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateChannelsDetail')
    async main(@Args('payload') payload: BplusItSappiCreateChannelDetailInput[])
    {
        await this.commandBus.dispatch(new CreateChannelsDetailCommand(payload));
        return true;
    }
}