import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateFlowInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateFlowsCommand } from '@hades/bplus-it-sappi/flow/application/create/create-flows.command';

@Resolver()
export class CreateFlowsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateFlows')
    async main(@Args('payload') payload: BplusItSappiCreateFlowInput[])
    {
        await this.commandBus.dispatch(new CreateFlowsCommand(payload));
        return true;
    }
}