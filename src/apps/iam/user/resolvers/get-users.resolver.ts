import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetUsersQuery } from '@hades/iam/user/application/get/get-users.query';
import { IamUser } from './../../../../graphql';

@Resolver()
export class GetUsersResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamGetUsers')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<IamUser[]>
    {
        return await this.queryBus.ask(new GetUsersQuery(queryStatement));
    }
}