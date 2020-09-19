import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateRefreshTokensQuery } from '@hades/o-auth/refresh-token/application/paginate/paginate-refresh-tokens.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginateRefreshTokensResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthPaginateRefreshTokens')
    async main(@Args('query') queryStatement: QueryStatement, @Args('constraint') constraint: QueryStatement): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateRefreshTokensQuery(queryStatement, constraint));   
    }
}