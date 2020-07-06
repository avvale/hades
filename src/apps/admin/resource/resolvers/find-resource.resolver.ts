import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindResourceQuery } from '@hades/admin/resource/application/find/find-resource.query';
import { AdminResource } from './../../../../graphql';

@Resolver()
export class FindResourceResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminFindResource')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<AdminResource>
    {
        return await this.queryBus.ask(new FindResourceQuery(queryStatements));
    }
}