import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { PaginateLangsQuery } from '@hades/admin/lang/application/paginate/paginate-langs.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginateLangsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminPaginateLangs')
    async main(@Args('query') queryStatements: QueryStatementInput[], @Args('constraint') constraint: QueryStatementInput[]): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateLangsQuery(queryStatements, constraint));   
    }
}