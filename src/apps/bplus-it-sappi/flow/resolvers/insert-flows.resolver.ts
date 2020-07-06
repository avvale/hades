import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateFlowInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { InsertFlowsCommand } from '@hades/bplus-it-sappi/flow/application/insert/insert-flows.command';

@Resolver()
export class InsertFlowsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiInsertFlows')
    async main(@Args('payload') payload: BplusItSappiCreateFlowInput[])
    {
        await this.commandBus.dispatch(new InsertFlowsCommand(payload));
        return true;
    }
}