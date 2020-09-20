import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindApplicationQuery } from '@hades/o-auth/application/application/find/find-application.query';
import { OAuthApplication } from './../../../../graphql';

@Resolver()
export class FindApplicationResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthFindApplication')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<OAuthApplication>
    {
        return await this.queryBus.ask(new FindApplicationQuery(queryStatement));
    }
}