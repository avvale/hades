import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindMessageOverviewQuery } from '@hades/cci/message-overview/application/find/find-message-overview.query';
import { CciMessageOverview } from './../../../../graphql';

@Resolver()
export class FindMessageOverviewResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindMessageOverview')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciMessageOverview>
    {
        return await this.queryBus.ask(new FindMessageOverviewQuery(queryStatement));
    }
}