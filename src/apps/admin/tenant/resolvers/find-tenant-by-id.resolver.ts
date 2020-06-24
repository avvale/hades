import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindTenantByIdQuery } from '@hades/admin/tenant/application/find/find-tenant-by-id.query';
import { AdminTenant } from './../../../../graphql';

@Resolver()
export class FindTenantByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminFindTenantById')
    async main(@Args('id') id: string): Promise<AdminTenant>
    {
        return await this.queryBus.ask(new FindTenantByIdQuery(id));
    }
}