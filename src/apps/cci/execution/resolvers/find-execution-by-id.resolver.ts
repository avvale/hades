import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindExecutionByIdQuery } from '@hades/cci/execution/application/find/find-execution-by-id.query';
import { CciExecution } from './../../../../graphql';

@Resolver()
export class FindExecutionByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindExecutionById')
    async main(@Args('id') id: string): Promise<CciExecution>
    {
        return await this.queryBus.ask(new FindExecutionByIdQuery(id));
    }
}