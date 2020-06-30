import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetJobsOverviewQuery } from '@hades/bplus-it-sappi/job-overview/application/get/get-jobs-overview.query';
import { BplusItSappiJobOverview } from './../../../../graphql';

@Resolver()
export class GetJobsOverviewResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiGetJobsOverview')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiJobOverview[]>
    {
        return await this.queryBus.ask(new GetJobsOverviewQuery(queryStatements));
    }
}