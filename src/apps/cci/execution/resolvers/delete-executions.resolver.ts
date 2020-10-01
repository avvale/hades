import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetExecutionsQuery } from '@hades/cci/execution/application/get/get-executions.query';
import { DeleteExecutionsCommand } from '@hades/cci/execution/application/delete/delete-executions.command';

@Resolver()
export class DeleteExecutionsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteExecutions')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const executions = await this.queryBus.ask(new GetExecutionsQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteExecutionsCommand(queryStatement));

        return executions;
    }
}