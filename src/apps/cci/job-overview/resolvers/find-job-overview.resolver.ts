import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindJobOverviewQuery } from '@hades/cci/job-overview/application/find/find-job-overview.query';
import { CciJobOverview } from './../../../../graphql';

@Resolver()
export class FindJobOverviewResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindJobOverview')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciJobOverview>
    {
        return await this.queryBus.ask(new FindJobOverviewQuery(queryStatement));
    }
}