import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminUpdateBoundedContextInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdateBoundedContextCommand } from '@hades/admin/bounded-context/application/update/update-bounded-context.command';
import { FindBoundedContextByIdQuery } from '@hades/admin/bounded-context/application/find/find-bounded-context-by-id.query';

@Resolver()
export class UpdateBoundedContextResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminUpdateBoundedContext')
    async main(@Args('payload') payload: AdminUpdateBoundedContextInput)
    {
        await this.commandBus.dispatch(new UpdateBoundedContextCommand(
            payload.id,
            payload.name,
            payload.root,
            payload.sort,
            payload.isActive,
            
        ));
        
        return await this.queryBus.ask(new FindBoundedContextByIdQuery(payload.id));
    }
}