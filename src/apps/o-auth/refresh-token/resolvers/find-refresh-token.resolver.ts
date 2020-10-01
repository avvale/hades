import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindRefreshTokenQuery } from '@hades/o-auth/refresh-token/application/find/find-refresh-token.query';
import { OAuthRefreshToken } from './../../../../graphql';

@Resolver()
export class FindRefreshTokenResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthFindRefreshToken')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<OAuthRefreshToken>
    {
        return await this.queryBus.ask(new FindRefreshTokenQuery(queryStatement));
    }
}