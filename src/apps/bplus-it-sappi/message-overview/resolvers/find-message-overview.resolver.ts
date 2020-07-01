import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindMessageOverviewQuery } from '@hades/bplus-it-sappi/message-overview/application/find/find-message-overview.query';
import { BplusItSappiMessageOverview } from './../../../../graphql';

@Resolver()
export class FindMessageOverviewResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindMessageOverview')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiMessageOverview>
    {
        return await this.queryBus.ask(new FindMessageOverviewQuery(queryStatements));
    }
}