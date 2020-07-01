import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindChannelOverviewByIdQuery } from '@hades/bplus-it-sappi/channel-overview/application/find/find-channel-overview-by-id.query';
import { DeleteChannelOverviewByIdCommand } from '@hades/bplus-it-sappi/channel-overview/application/delete/delete-channel-overview-by-id.command';

@Resolver()
export class DeleteChannelOverviewByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteChannelOverviewById')
    async main(@Args('id') id: string)
    {
        const channelOverview = await this.queryBus.ask(new FindChannelOverviewByIdQuery(id));

        await this.commandBus.dispatch(new DeleteChannelOverviewByIdCommand(id));

        return channelOverview;
    }
}