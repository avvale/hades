import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindRefreshTokenQuery } from '@hades/o-auth/refresh-token/application/find/find-refresh-token.query';
import { OAuthRefreshToken } from './../../../../graphql';

@Resolver()
export class FindRefreshTokenResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthFindRefreshToken')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<OAuthRefreshToken>
    {
        return await this.queryBus.ask(new FindRefreshTokenQuery(queryStatements));
    }
}