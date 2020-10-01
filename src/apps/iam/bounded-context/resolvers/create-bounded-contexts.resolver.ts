import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamCreateBoundedContextInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateBoundedContextsCommand } from '@hades/iam/bounded-context/application/create/create-bounded-contexts.command';

@Resolver()
export class CreateBoundedContextsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamCreateBoundedContexts')
    async main(@Args('payload') payload: IamCreateBoundedContextInput[])
    {
        await this.commandBus.dispatch(new CreateBoundedContextsCommand(payload));
        return true;
    }
}