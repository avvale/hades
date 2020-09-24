import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindTenantByIdQuery } from '@hades/iam/tenant/application/find/find-tenant-by-id.query';
import { IamTenant } from './../../../../graphql';

@Resolver()
export class FindTenantByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamFindTenantById')
    async main(@Args('id') id: string): Promise<IamTenant>
    {
        return await this.queryBus.ask(new FindTenantByIdQuery(id));
    }
}