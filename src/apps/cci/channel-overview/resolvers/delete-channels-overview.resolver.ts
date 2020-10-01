import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetChannelsOverviewQuery } from '@hades/cci/channel-overview/application/get/get-channels-overview.query';
import { DeleteChannelsOverviewCommand } from '@hades/cci/channel-overview/application/delete/delete-channels-overview.command';

@Resolver()
export class DeleteChannelsOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteChannelsOverview')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const channelsOverview = await this.queryBus.ask(new GetChannelsOverviewQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteChannelsOverviewCommand(queryStatement));

        return channelsOverview;
    }
}