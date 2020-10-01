import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateUsersQuery } from '@hades/iam/user/application/paginate/paginate-users.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginateUsersResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamPaginateUsers')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateUsersQuery(queryStatement, constraint));   
    }
}