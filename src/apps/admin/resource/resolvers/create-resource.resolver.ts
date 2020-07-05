import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminCreateResourceInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { CreateResourceCommand } from '@hades/admin/resource/application/create/create-resource.command';
import { FindResourceByIdQuery } from '@hades/admin/resource/application/find/find-resource-by-id.query';

@Resolver()
export class CreateResourceResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminCreateResource')
    async main(@Args('payload') payload: AdminCreateResourceInput)
    {
        await this.commandBus.dispatch(new CreateResourceCommand(
            payload.id,
            payload.boundedContextId,
            payload.name,
            payload.hasCustomFields,
            payload.hasAttachments,
            
        ));
        
        return await this.queryBus.ask(new FindResourceByIdQuery(payload.id));
    }
}