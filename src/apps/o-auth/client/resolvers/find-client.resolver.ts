import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindClientQuery } from '@hades/o-auth/client/application/find/find-client.query';
import { OAuthClient } from './../../../../graphql';

@Resolver()
export class FindClientResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthFindClient')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<OAuthClient>
    {
        return await this.queryBus.ask(new FindClientQuery(queryStatements));
    }
}