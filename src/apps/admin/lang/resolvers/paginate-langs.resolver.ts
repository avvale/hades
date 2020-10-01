import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateLangsQuery } from '@hades/admin/lang/application/paginate/paginate-langs.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginateLangsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminPaginateLangs')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateLangsQuery(queryStatement, constraint));   
    }
}