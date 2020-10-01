import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetExecutionsQuery } from '@hades/cci/execution/application/get/get-executions.query';
import { CciExecution } from './../../../../graphql';

@Resolver()
export class GetExecutionsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciGetExecutions')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciExecution[]>
    {
        return await this.queryBus.ask(new GetExecutionsQuery(queryStatement));
    }
}