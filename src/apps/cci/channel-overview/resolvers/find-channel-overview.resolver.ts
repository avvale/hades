import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindChannelOverviewQuery } from '@hades/cci/channel-overview/application/find/find-channel-overview.query';
import { CciChannelOverview } from './../../../../graphql';

@Resolver()
export class FindChannelOverviewResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindChannelOverview')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciChannelOverview>
    {
        return await this.queryBus.ask(new FindChannelOverviewQuery(queryStatement));
    }
}