import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindUserQuery } from '@hades/iam/user/application/find/find-user.query';
import { IamUser } from './../../../../graphql';

@Resolver()
export class FindUserResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamFindUser')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<IamUser>
    {
        return await this.queryBus.ask(new FindUserQuery(queryStatement));
    }
}