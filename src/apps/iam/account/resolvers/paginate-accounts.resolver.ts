import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateAccountsQuery } from '@hades/iam/account/application/paginate/paginate-accounts.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginateAccountsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamPaginateAccounts')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateAccountsQuery(queryStatement, constraint));   
    }
}