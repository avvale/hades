import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminCreateResourceInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateResourcesCommand } from '@hades/admin/resource/application/create/create-resources.command';

@Resolver()
export class CreateResourcesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminCreateResources')
    async main(@Args('payload') payload: AdminCreateResourceInput[])
    {
        await this.commandBus.dispatch(new CreateResourcesCommand(payload));
        return true;
    }
}