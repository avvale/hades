import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetFlowsQuery } from '@hades/bplus-it-sappi/flow/application/get/get-flows.query';
import { DeleteFlowsCommand } from '@hades/bplus-it-sappi/flow/application/delete/delete-flows.command';

@Resolver()
export class DeleteFlowsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteFlows')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const flows = await this.queryBus.ask(new GetFlowsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteFlowsCommand(queryStatements));

        return flows;
    }
}