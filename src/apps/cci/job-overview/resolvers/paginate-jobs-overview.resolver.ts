import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateJobsOverviewQuery } from '@hades/cci/job-overview/application/paginate/paginate-jobs-overview.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginateJobsOverviewResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciPaginateJobsOverview')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateJobsOverviewQuery(queryStatement, constraint));   
    }
}