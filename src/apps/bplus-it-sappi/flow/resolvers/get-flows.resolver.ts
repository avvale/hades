import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetFlowsQuery } from '@hades/bplus-it-sappi/flow/application/get/get-flows.query';
import { BplusItSappiFlow } from './../../../../graphql';

@Resolver()
export class GetFlowsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiGetFlows')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiFlow[]>
    {
        return await this.queryBus.ask(new GetFlowsQuery(queryStatements));
    }
}