import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetChannelsOverviewQuery } from '@hades/cci/channel-overview/application/get/get-channels-overview.query';
import { CciChannelOverview } from './../../../../graphql';

@Resolver()
export class GetChannelsOverviewResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciGetChannelsOverview')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciChannelOverview[]>
    {
        return await this.queryBus.ask(new GetChannelsOverviewQuery(queryStatement));
    }
}