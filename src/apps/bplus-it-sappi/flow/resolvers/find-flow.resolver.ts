import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindFlowQuery } from '@hades/bplus-it-sappi/flow/application/find/find-flow.query';
import { BplusItSappiFlow } from './../../../../graphql';

@Resolver()
export class FindFlowResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindFlow')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiFlow>
    {
        return await this.queryBus.ask(new FindFlowQuery(queryStatements));
    }
}