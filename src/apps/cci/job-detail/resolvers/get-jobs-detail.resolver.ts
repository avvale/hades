import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetJobsDetailQuery } from '@hades/cci/job-detail/application/get/get-jobs-detail.query';
import { CciJobDetail } from './../../../../graphql';

@Resolver()
export class GetJobsDetailResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciGetJobsDetail')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciJobDetail[]>
    {
        return await this.queryBus.ask(new GetJobsDetailQuery(queryStatement));
    }
}