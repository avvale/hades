import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetFlowsQuery } from '@hades/cci/flow/application/get/get-flows.query';
import { CciFlow } from './../../../../graphql';

@Resolver()
export class GetFlowsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciGetFlows')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciFlow[]>
    {
        return await this.queryBus.ask(new GetFlowsQuery(queryStatement));
    }
}