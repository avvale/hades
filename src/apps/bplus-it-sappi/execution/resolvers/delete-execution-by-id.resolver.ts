import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindExecutionByIdQuery } from '@hades/bplus-it-sappi/execution/application/find/find-execution-by-id.query';
import { DeleteExecutionByIdCommand } from '@hades/bplus-it-sappi/execution/application/delete/delete-execution-by-id.command';

@Resolver()
export class DeleteExecutionByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteExecutionById')
    async main(@Args('id') id: string)
    {
        const execution = await this.queryBus.ask(new FindExecutionByIdQuery(id));

        await this.commandBus.dispatch(new DeleteExecutionByIdCommand(id));

        return execution;
    }
}