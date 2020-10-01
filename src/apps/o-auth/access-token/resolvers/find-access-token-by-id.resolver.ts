import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAccessTokenByIdQuery } from '@hades/o-auth/access-token/application/find/find-access-token-by-id.query';
import { OAuthAccessToken } from './../../../../graphql';

@Resolver()
export class FindAccessTokenByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthFindAccessTokenById')
    async main(@Args('id') id: string): Promise<OAuthAccessToken>
    {
        return await this.queryBus.ask(new FindAccessTokenByIdQuery(id));
    }
}