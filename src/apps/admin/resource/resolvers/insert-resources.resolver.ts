import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminCreateResourceInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { InsertResourcesCommand } from '@hades/admin/resource/application/insert/insert-resources.command';

@Resolver()
export class InsertResourcesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminInsertResources')
    async main(@Args('payload') payload: AdminCreateResourceInput[])
    {
        await this.commandBus.dispatch(new InsertResourcesCommand(payload));
        return true;
    }
}