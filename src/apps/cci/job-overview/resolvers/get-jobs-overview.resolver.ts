import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetJobsOverviewQuery } from '@hades/cci/job-overview/application/get/get-jobs-overview.query';
import { CciJobOverview } from './../../../../graphql';

@Resolver()
export class GetJobsOverviewResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciGetJobsOverview')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciJobOverview[]>
    {
        return await this.queryBus.ask(new GetJobsOverviewQuery(queryStatement));
    }
}