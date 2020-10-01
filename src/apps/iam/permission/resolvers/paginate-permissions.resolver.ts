import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginatePermissionsQuery } from '@hades/iam/permission/application/paginate/paginate-permissions.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginatePermissionsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamPaginatePermissions')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginatePermissionsQuery(queryStatement, constraint));   
    }
}