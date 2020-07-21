import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateChannelInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateChannelsCommand } from '@hades/bplus-it-sappi/channel/application/create/create-channels.command';

@Resolver()
export class CreateChannelsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateChannels')
    async main(@Args('payload') payload: BplusItSappiCreateChannelInput[])
    {
        await this.commandBus.dispatch(new CreateChannelsCommand(payload));
        return true;
    }
}