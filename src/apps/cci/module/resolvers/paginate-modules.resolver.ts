import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateModulesQuery } from '@hades/cci/module/application/paginate/paginate-modules.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginateModulesResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciPaginateModules')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateModulesQuery(queryStatement, constraint));   
    }
}