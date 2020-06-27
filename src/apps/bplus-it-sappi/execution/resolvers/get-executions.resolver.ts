import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetExecutionsQuery } from '@hades/bplus-it-sappi/execution/application/get/get-executions.query';
import { BplusItSappiExecution } from './../../../../graphql';

@Resolver()
export class GetExecutionsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiGetExecutions')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiExecution[]>
    {
        return await this.queryBus.ask(new GetExecutionsQuery(queryStatements));
    }
}