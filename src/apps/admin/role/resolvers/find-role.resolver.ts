import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindRoleQuery } from '@hades/admin/role/application/find/find-role.query';
import { AdminRole } from './../../../../graphql';

@Resolver()
export class FindRoleResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminFindRole')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<AdminRole>
    {
        return await this.queryBus.ask(new FindRoleQuery(queryStatements));
    }
}