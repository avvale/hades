import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindBoundedContextByIdQuery } from '@hades/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { DeleteBoundedContextByIdCommand } from '@hades/iam/bounded-context/application/delete/delete-bounded-context-by-id.command';

@Resolver()
export class DeleteBoundedContextByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamDeleteBoundedContextById')
    async main(@Args('id') id: string)
    {
        const boundedContext = await this.queryBus.ask(new FindBoundedContextByIdQuery(id));

        await this.commandBus.dispatch(new DeleteBoundedContextByIdCommand(id));

        return boundedContext;
    }
}