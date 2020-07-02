import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { PaginateBoundedContextsQuery } from '@hades/admin/bounded-context/application/paginate/paginate-bounded-contexts.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginateBoundedContextsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminPaginateBoundedContexts')
    async main(@Args('query') queryStatements: QueryStatementInput[], @Args('constraint') constraint: QueryStatementInput[]): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateBoundedContextsQuery(queryStatements, constraint));   
    }
}