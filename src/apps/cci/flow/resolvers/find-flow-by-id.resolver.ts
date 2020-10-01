import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindFlowByIdQuery } from '@hades/cci/flow/application/find/find-flow-by-id.query';
import { CciFlow } from './../../../../graphql';

@Resolver()
export class FindFlowByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindFlowById')
    async main(@Args('id') id: string): Promise<CciFlow>
    {
        return await this.queryBus.ask(new FindFlowByIdQuery(id));
    }
}