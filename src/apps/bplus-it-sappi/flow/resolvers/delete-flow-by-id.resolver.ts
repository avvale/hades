import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindFlowByIdQuery } from '@hades/bplus-it-sappi/flow/application/find/find-flow-by-id.query';
import { DeleteFlowByIdCommand } from '@hades/bplus-it-sappi/flow/application/delete/delete-flow-by-id.command';

@Resolver()
export class DeleteFlowByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteFlowById')
    async main(@Args('id') id: string)
    {
        const flow = await this.queryBus.ask(new FindFlowByIdQuery(id));

        await this.commandBus.dispatch(new DeleteFlowByIdCommand(id));

        return flow;
    }
}