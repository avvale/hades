import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetRolesQuery } from '@hades/bplus-it-sappi/role/application/get/get-roles.query';
import { BplusItSappiRole } from './../../../../graphql';

@Resolver()
export class GetRolesResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiGetRoles')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiRole[]>
    {
        return await this.queryBus.ask(new GetRolesQuery(queryStatements));
    }
}