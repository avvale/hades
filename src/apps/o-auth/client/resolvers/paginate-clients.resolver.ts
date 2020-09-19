import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateClientsQuery } from '@hades/o-auth/client/application/paginate/paginate-clients.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginateClientsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthPaginateClients')
    async main(@Args('query') queryStatement: QueryStatement, @Args('constraint') constraint: QueryStatement): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateClientsQuery(queryStatement, constraint));   
    }
}