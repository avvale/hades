import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateAccessTokensQuery } from '@hades/o-auth/access-token/application/paginate/paginate-access-tokens.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginateAccessTokensResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthPaginateAccessTokens')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateAccessTokensQuery(queryStatement, constraint));   
    }
}