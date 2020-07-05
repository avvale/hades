import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminUpdateResourceInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdateResourceCommand } from '@hades/admin/resource/application/update/update-resource.command';
import { FindResourceByIdQuery } from '@hades/admin/resource/application/find/find-resource-by-id.query';

@Resolver()
export class UpdateResourceResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminUpdateResource')
    async main(@Args('payload') payload: AdminUpdateResourceInput)
    {
        await this.commandBus.dispatch(new UpdateResourceCommand(
            payload.id,
            payload.boundedContextId,
            payload.name,
            payload.hasCustomFields,
            payload.hasAttachments,
            
        ));
        
        return await this.queryBus.ask(new FindResourceByIdQuery(payload.id));
    }
}