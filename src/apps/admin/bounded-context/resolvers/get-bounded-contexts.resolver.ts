import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetBoundedContextsQuery } from '@hades/admin/bounded-context/application/get/get-bounded-contexts.query';
import { AdminBoundedContext } from './../../../../graphql';

@Resolver()
export class GetBoundedContextsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminGetBoundedContexts')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<AdminBoundedContext[]>
    {
        return await this.queryBus.ask(new GetBoundedContextsQuery(queryStatements));
    }
}