import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindFlowQuery } from '@hades/cci/flow/application/find/find-flow.query';
import { CciFlow } from './../../../../graphql';

@Resolver()
export class FindFlowResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindFlow')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciFlow>
    {
        return await this.queryBus.ask(new FindFlowQuery(queryStatement));
    }
}