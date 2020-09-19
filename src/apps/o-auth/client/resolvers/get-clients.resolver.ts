import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetClientsQuery } from '@hades/o-auth/client/application/get/get-clients.query';
import { OAuthClient } from './../../../../graphql';

@Resolver()
export class GetClientsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthGetClients')
    async main(@Args('query') queryStatement: QueryStatement): Promise<OAuthClient[]>
    {
        return await this.queryBus.ask(new GetClientsQuery(queryStatement));
    }
}