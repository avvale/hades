import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { PaginateSummariesQuery } from '@hades/nfc/summary/application/paginate/paginate-summaries.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginateSummariesResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('nfcPaginateSummaries')
    async main(@Args('query') queryStatements: QueryStatementInput[], @Args('constraint') constraint: QueryStatementInput[]): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateSummariesQuery(queryStatements, constraint));   
    }
}