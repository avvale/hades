import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetResourcesQuery } from '@hades/admin/resource/application/get/get-resources.query';
import { AdminResource } from './../../../../graphql';

@Resolver()
export class GetResourcesResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminGetResources')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<AdminResource[]>
    {
        return await this.queryBus.ask(new GetResourcesQuery(queryStatements));
    }
}