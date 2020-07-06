import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindFlowByIdQuery } from '@hades/bplus-it-sappi/flow/application/find/find-flow-by-id.query';
import { BplusItSappiFlow } from './../../../../graphql';

@Resolver()
export class FindFlowByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindFlowById')
    async main(@Args('id') id: string): Promise<BplusItSappiFlow>
    {
        return await this.queryBus.ask(new FindFlowByIdQuery(id));
    }
}