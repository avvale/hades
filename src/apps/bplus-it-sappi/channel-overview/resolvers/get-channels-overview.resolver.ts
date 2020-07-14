import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetChannelsOverviewQuery } from '@hades/bplus-it-sappi/channel-overview/application/get/get-channels-overview.query';
import { BplusItSappiChannelOverview } from './../../../../graphql';

@Resolver()
export class GetChannelsOverviewResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiGetChannelsOverview')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiChannelOverview[]>
    {
        return await this.queryBus.ask(new GetChannelsOverviewQuery(queryStatements));
    }
}