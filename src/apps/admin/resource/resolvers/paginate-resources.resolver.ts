import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateResourcesQuery } from '@hades/admin/resource/application/paginate/paginate-resources.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginateResourcesResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminPaginateResources')
    async main(@Args('query') queryStatements: QueryStatementInput[], @Args('constraint') constraint: QueryStatementInput[]): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateResourcesQuery(queryStatements, constraint));   
    }
}