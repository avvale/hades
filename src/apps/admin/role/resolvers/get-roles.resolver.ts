import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetRolesQuery } from '@hades/admin/role/application/get/get-roles.query';
import { AdminRole } from './../../../../graphql';

@Resolver()
export class GetRolesResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminGetRoles')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<AdminRole[]>
    {
        return await this.queryBus.ask(new GetRolesQuery(queryStatements));
    }
}