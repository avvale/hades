import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetRolesQuery } from '@hades/iam/role/application/get/get-roles.query';
import { IamRole } from './../../../../graphql';

@Resolver()
export class GetRolesResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamGetRoles')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<IamRole[]>
    {
        return await this.queryBus.ask(new GetRolesQuery(queryStatement));
    }
}