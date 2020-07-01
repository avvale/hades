import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetChannelsOverviewQuery } from '@hades/bplus-it-sappi/channel-overview/application/get/get-channels-overview.query';
import { DeleteChannelsOverviewCommand } from '@hades/bplus-it-sappi/channel-overview/application/delete/delete-channels-overview.command';

@Resolver()
export class DeleteChannelsOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteChannelsOverview')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const channelsOverview = await this.queryBus.ask(new GetChannelsOverviewQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteChannelsOverviewCommand(queryStatements));

        return channelsOverview;
    }
}