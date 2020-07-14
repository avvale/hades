import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetTenantsQuery } from '@hades/admin/tenant/application/get/get-tenants.query';
import { AdminTenant } from './../../../../graphql';

@Resolver()
export class GetTenantsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminGetTenants')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<AdminTenant[]>
    {
        return await this.queryBus.ask(new GetTenantsQuery(queryStatements));
    }
}