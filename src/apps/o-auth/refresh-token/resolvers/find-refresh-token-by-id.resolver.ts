import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindRefreshTokenByIdQuery } from '@hades/o-auth/refresh-token/application/find/find-refresh-token-by-id.query';
import { OAuthRefreshToken } from './../../../../graphql';

@Resolver()
export class FindRefreshTokenByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthFindRefreshTokenById')
    async main(@Args('id') id: string): Promise<OAuthRefreshToken>
    {
        return await this.queryBus.ask(new FindRefreshTokenByIdQuery(id));
    }
}