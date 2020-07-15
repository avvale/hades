import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateChannelDetailInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { InsertChannelsDetailCommand } from '@hades/bplus-it-sappi/channel-detail/application/insert/insert-channels-detail.command';

@Resolver()
export class InsertChannelsDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiInsertChannelsDetail')
    async main(@Args('payload') payload: BplusItSappiCreateChannelDetailInput[])
    {
        await this.commandBus.dispatch(new InsertChannelsDetailCommand(payload));
        return true;
    }
}