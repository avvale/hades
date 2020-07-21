import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateExecutionInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateExecutionsCommand } from '@hades/bplus-it-sappi/execution/application/create/create-executions.command';

@Resolver()
export class CreateExecutionsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateExecutions')
    async main(@Args('payload') payload: BplusItSappiCreateExecutionInput[])
    {
        await this.commandBus.dispatch(new CreateExecutionsCommand(payload));
        return true;
    }
}