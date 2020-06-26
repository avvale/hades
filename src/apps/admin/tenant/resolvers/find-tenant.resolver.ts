import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindTenantQuery } from '@hades/admin/tenant/application/find/find-tenant.query';
import { AdminTenant } from './../../../../graphql';

@Resolver()
export class FindTenantResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminFindTenant')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<AdminTenant>
    {
        return await this.queryBus.ask(new FindTenantQuery(queryStatements));
    }
}