import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetTenantsQuery } from '@hades/iam/tenant/application/get/get-tenants.query';
import { IamTenant } from './../../../../graphql';

@Resolver()
export class GetTenantsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamGetTenants')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<IamTenant[]>
    {
        return await this.queryBus.ask(new GetTenantsQuery(queryStatement));
    }
}