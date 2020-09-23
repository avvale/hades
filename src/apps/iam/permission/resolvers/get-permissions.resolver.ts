import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetPermissionsQuery } from '@hades/iam/permission/application/get/get-permissions.query';
import { IamPermission } from './../../../../graphql';

@Resolver()
export class GetPermissionsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamGetPermissions')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<IamPermission[]>
    {
        return await this.queryBus.ask(new GetPermissionsQuery(queryStatement));
    }
}