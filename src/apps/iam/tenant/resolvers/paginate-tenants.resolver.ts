import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateTenantsQuery } from '@hades/iam/tenant/application/paginate/paginate-tenants.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginateTenantsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamPaginateTenants')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateTenantsQuery(queryStatement, constraint));   
    }
}