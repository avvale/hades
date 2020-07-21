import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateChannelOverviewInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateChannelsOverviewCommand } from '@hades/bplus-it-sappi/channel-overview/application/create/create-channels-overview.command';

@Resolver()
export class CreateChannelsOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateChannelsOverview')
    async main(@Args('payload') payload: BplusItSappiCreateChannelOverviewInput[])
    {
        await this.commandBus.dispatch(new CreateChannelsOverviewCommand(payload));
        return true;
    }
}