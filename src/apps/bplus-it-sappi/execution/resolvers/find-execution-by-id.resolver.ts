import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindExecutionByIdQuery } from '@hades/bplus-it-sappi/execution/application/find/find-execution-by-id.query';
import { BplusItSappiExecution } from './../../../../graphql';

@Resolver()
export class FindExecutionByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindExecutionById')
    async main(@Args('id') id: string): Promise<BplusItSappiExecution>
    {
        return await this.queryBus.ask(new FindExecutionByIdQuery(id));
    }
}