import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindAccountQuery } from '@hades/iam/account/application/find/find-account.query';
import { IamAccount } from './../../../../graphql';

@Resolver()
export class FindAccountResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamFindAccount')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<IamAccount>
    {
        return await this.queryBus.ask(new FindAccountQuery(queryStatement));
    }
}