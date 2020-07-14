import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetJobsDetailQuery } from '@hades/bplus-it-sappi/job-detail/application/get/get-jobs-detail.query';
import { BplusItSappiJobDetail } from './../../../../graphql';

@Resolver()
export class GetJobsDetailResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiGetJobsDetail')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiJobDetail[]>
    {
        return await this.queryBus.ask(new GetJobsDetailQuery(queryStatements));
    }
}