import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindExecutionQuery } from '@hades/cci/execution/application/find/find-execution.query';
import { CciExecution } from './../../../../graphql';

@Resolver()
export class FindExecutionResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindExecution')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciExecution>
    {
        return await this.queryBus.ask(new FindExecutionQuery(queryStatement));
    }
}