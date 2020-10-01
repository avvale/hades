import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindClientByIdQuery } from '@hades/o-auth/client/application/find/find-client-by-id.query';
import { OAuthClient } from './../../../../graphql';

@Resolver()
export class FindClientByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthFindClientById')
    async main(@Args('id') id: string): Promise<OAuthClient>
    {
        return await this.queryBus.ask(new FindClientByIdQuery(id));
    }
}