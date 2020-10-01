import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetFlowsQuery } from '@hades/cci/flow/application/get/get-flows.query';
import { DeleteFlowsCommand } from '@hades/cci/flow/application/delete/delete-flows.command';

@Resolver()
export class DeleteFlowsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteFlows')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const flows = await this.queryBus.ask(new GetFlowsQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteFlowsCommand(queryStatement));

        return flows;
    }
}