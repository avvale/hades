import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetBoundedContextsQuery } from '@hades/iam/bounded-context/application/get/get-bounded-contexts.query';
import { DeleteBoundedContextsCommand } from '@hades/iam/bounded-context/application/delete/delete-bounded-contexts.command';

@Resolver()
export class DeleteBoundedContextsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamDeleteBoundedContexts')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const boundedContexts = await this.queryBus.ask(new GetBoundedContextsQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteBoundedContextsCommand(queryStatement));

        return boundedContexts;
    }
}