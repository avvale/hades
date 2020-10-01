import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetAccountsQuery } from '@hades/iam/account/application/get/get-accounts.query';
import { IamAccount } from './../../../../graphql';

@Resolver()
export class GetAccountsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamGetAccounts')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<IamAccount[]>
    {
        return await this.queryBus.ask(new GetAccountsQuery(queryStatement));
    }
}