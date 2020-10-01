import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciCreateFlowInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateFlowsCommand } from '@hades/cci/flow/application/create/create-flows.command';

@Resolver()
export class CreateFlowsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciCreateFlows')
    async main(@Args('payload') payload: CciCreateFlowInput[])
    {
        await this.commandBus.dispatch(new CreateFlowsCommand(payload));
        return true;
    }
}