import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetRolesQuery } from '@hades/cci/role/application/get/get-roles.query';
import { CciRole } from './../../../../graphql';

@Resolver()
export class GetRolesResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciGetRoles')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciRole[]>
    {
        return await this.queryBus.ask(new GetRolesQuery(queryStatement));
    }
}