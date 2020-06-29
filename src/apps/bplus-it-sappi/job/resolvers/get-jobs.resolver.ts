import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetJobsQuery } from '@hades/bplus-it-sappi/job/application/get/get-jobs.query';
import { BplusItSappiJob } from './../../../../graphql';

@Resolver()
export class GetJobsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiGetJobs')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiJob[]>
    {
        return await this.queryBus.ask(new GetJobsQuery(queryStatements));
    }
}