import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateSessionsQuery } from '@hades/nfc/session/application/paginate/paginate-sessions.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginateSessionsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('nfcPaginateSessions')
    async main(@Args('query') queryStatements: QueryStatementInput[], @Args('constraint') constraint: QueryStatementInput[]): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateSessionsQuery(queryStatements, constraint));   
    }
}