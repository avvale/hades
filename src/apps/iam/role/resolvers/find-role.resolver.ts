import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindRoleQuery } from '@hades/iam/role/application/find/find-role.query';
import { IamRole } from './../../../../graphql';

@Resolver()
export class FindRoleResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamFindRole')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<IamRole>
    {
        return await this.queryBus.ask(new FindRoleQuery(queryStatement));
    }
}