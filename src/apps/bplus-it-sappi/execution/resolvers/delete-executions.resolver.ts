import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetExecutionsQuery } from '@hades/bplus-it-sappi/execution/application/get/get-executions.query';
import { DeleteExecutionsCommand } from '@hades/bplus-it-sappi/execution/application/delete/delete-executions.command';

@Resolver()
export class DeleteExecutionsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteExecutions')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const executions = await this.queryBus.ask(new GetExecutionsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteExecutionsCommand(queryStatements));

        return executions;
    }
}