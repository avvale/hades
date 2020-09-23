import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetAccessTokensQuery } from '@hades/o-auth/access-token/application/get/get-access-tokens.query';
import { OAuthAccessToken } from './../../../../graphql';

@Resolver()
export class GetAccessTokensResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthGetAccessTokens')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<OAuthAccessToken[]>
    {
        return await this.queryBus.ask(new GetAccessTokensQuery(queryStatement));
    }
}