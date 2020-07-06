import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateChannelInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { InsertChannelsCommand } from '@hades/bplus-it-sappi/channel/application/insert/insert-channels.command';

@Resolver()
export class InsertChannelsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiInsertChannels')
    async main(@Args('payload') payload: BplusItSappiCreateChannelInput[])
    {
        await this.commandBus.dispatch(new InsertChannelsCommand(payload));
        return true;
    }
}