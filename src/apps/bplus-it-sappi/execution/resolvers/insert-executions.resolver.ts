import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateExecutionInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { InsertExecutionsCommand } from '@hades/bplus-it-sappi/execution/application/insert/insert-executions.command';

@Resolver()
export class InsertExecutionsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiInsertExecutions')
    async main(@Args('payload') payload: BplusItSappiCreateExecutionInput[])
    {
        await this.commandBus.dispatch(new InsertExecutionsCommand(payload));
        return true;
    }
}