import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminCreateBoundedContextInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateBoundedContextsCommand } from '@hades/admin/bounded-context/application/create/create-bounded-contexts.command';

@Resolver()
export class CreateBoundedContextsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminCreateBoundedContexts')
    async main(@Args('payload') payload: AdminCreateBoundedContextInput[])
    {
        await this.commandBus.dispatch(new CreateBoundedContextsCommand(payload));
        return true;
    }
}