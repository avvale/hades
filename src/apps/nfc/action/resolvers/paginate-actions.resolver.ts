import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { PaginateActionsQuery } from '@hades/nfc/action/application/paginate/paginate-actions.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginateActionsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('nfcPaginateActions')
    async main(@Args('query') queryStatements: QueryStatementInput[], @Args('constraint') constraint: QueryStatementInput[]): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateActionsQuery(queryStatements, constraint));   
    }
}