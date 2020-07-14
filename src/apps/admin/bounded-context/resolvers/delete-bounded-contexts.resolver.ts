import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetBoundedContextsQuery } from '@hades/admin/bounded-context/application/get/get-bounded-contexts.query';
import { DeleteBoundedContextsCommand } from '@hades/admin/bounded-context/application/delete/delete-bounded-contexts.command';

@Resolver()
export class DeleteBoundedContextsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminDeleteBoundedContexts')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const boundedContexts = await this.queryBus.ask(new GetBoundedContextsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteBoundedContextsCommand(queryStatements));

        return boundedContexts;
    }
}