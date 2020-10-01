import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindRoleQuery } from '@hades/cci/role/application/find/find-role.query';
import { CciRole } from './../../../../graphql';

@Resolver()
export class FindRoleResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindRole')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciRole>
    {
        return await this.queryBus.ask(new FindRoleQuery(queryStatement));
    }
}