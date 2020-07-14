import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindChannelOverviewQuery } from '@hades/bplus-it-sappi/channel-overview/application/find/find-channel-overview.query';
import { BplusItSappiChannelOverview } from './../../../../graphql';

@Resolver()
export class FindChannelOverviewResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindChannelOverview')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiChannelOverview>
    {
        return await this.queryBus.ask(new FindChannelOverviewQuery(queryStatements));
    }
}