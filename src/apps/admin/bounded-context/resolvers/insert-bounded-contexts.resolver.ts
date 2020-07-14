import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminCreateBoundedContextInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { InsertBoundedContextsCommand } from '@hades/admin/bounded-context/application/insert/insert-bounded-contexts.command';

@Resolver()
export class InsertBoundedContextsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminInsertBoundedContexts')
    async main(@Args('payload') payload: AdminCreateBoundedContextInput[])
    {
        await this.commandBus.dispatch(new InsertBoundedContextsCommand(payload));
        return true;
    }
}