import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindPermissionQuery } from '@hades/admin/permission/application/find/find-permission.query';
import { AdminPermission } from './../../../../graphql';

@Resolver()
export class FindPermissionResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminFindPermission')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<AdminPermission>
    {
        return await this.queryBus.ask(new FindPermissionQuery(queryStatements));
    }
}