import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateApplicationsQuery } from '@hades/o-auth/application/application/paginate/paginate-applications.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginateApplicationsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthPaginateApplications')
    async main(@Args('query') queryStatement: QueryStatement, @Args('constraint') constraint: QueryStatement): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateApplicationsQuery(queryStatement, constraint));   
    }
}