import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetApplicationsQuery } from '@hades/o-auth/application/application/get/get-applications.query';
import { OAuthApplication } from './../../../../graphql';

@Resolver()
export class GetApplicationsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthGetApplications')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<OAuthApplication[]>
    {
        return await this.queryBus.ask(new GetApplicationsQuery(queryStatements));
    }
}