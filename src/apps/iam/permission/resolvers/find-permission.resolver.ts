import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindPermissionQuery } from '@hades/iam/permission/application/find/find-permission.query';
import { IamPermission } from './../../../../graphql';

@Resolver()
export class FindPermissionResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamFindPermission')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<IamPermission>
    {
        return await this.queryBus.ask(new FindPermissionQuery(queryStatement));
    }
}