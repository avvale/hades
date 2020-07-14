import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindBoundedContextQuery } from '@hades/admin/bounded-context/application/find/find-bounded-context.query';
import { AdminBoundedContext } from './../../../../graphql';

@Resolver()
export class FindBoundedContextResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminFindBoundedContext')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<AdminBoundedContext>
    {
        return await this.queryBus.ask(new FindBoundedContextQuery(queryStatements));
    }
}