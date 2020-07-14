import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetPermissionsQuery } from '@hades/admin/permission/application/get/get-permissions.query';
import { AdminPermission } from './../../../../graphql';

@Resolver()
export class GetPermissionsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminGetPermissions')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<AdminPermission[]>
    {
        return await this.queryBus.ask(new GetPermissionsQuery(queryStatements));
    }
}