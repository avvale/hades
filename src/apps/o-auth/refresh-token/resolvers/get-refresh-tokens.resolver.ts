import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetRefreshTokensQuery } from '@hades/o-auth/refresh-token/application/get/get-refresh-tokens.query';
import { OAuthRefreshToken } from './../../../../graphql';

@Resolver()
export class GetRefreshTokensResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthGetRefreshTokens')
    async main(@Args('query') queryStatement: QueryStatement): Promise<OAuthRefreshToken[]>
    {
        return await this.queryBus.ask(new GetRefreshTokensQuery(queryStatement));
    }
}