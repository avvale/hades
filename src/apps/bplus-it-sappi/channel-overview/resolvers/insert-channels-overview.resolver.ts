import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateChannelOverviewInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { InsertChannelsOverviewCommand } from '@hades/bplus-it-sappi/channel-overview/application/insert/insert-channels-overview.command';

@Resolver()
export class InsertChannelsOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiInsertChannelsOverview')
    async main(@Args('payload') payload: BplusItSappiCreateChannelOverviewInput[])
    {
        await this.commandBus.dispatch(new InsertChannelsOverviewCommand(payload));
        return true;
    }
}