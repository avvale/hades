import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetModulesQuery } from '@hades/cci/module/application/get/get-modules.query';
import { CciModule } from './../../../../graphql';

@Resolver()
export class GetModulesResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciGetModules')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciModule[]>
    {
        return await this.queryBus.ask(new GetModulesQuery(queryStatement));
    }
}