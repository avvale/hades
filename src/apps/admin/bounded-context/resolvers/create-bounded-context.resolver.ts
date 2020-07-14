import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminCreateBoundedContextInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateBoundedContextCommand } from '@hades/admin/bounded-context/application/create/create-bounded-context.command';
import { FindBoundedContextByIdQuery } from '@hades/admin/bounded-context/application/find/find-bounded-context-by-id.query';

@Resolver()
export class CreateBoundedContextResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminCreateBoundedContext')
    async main(@Args('payload') payload: AdminCreateBoundedContextInput)
    {
        await this.commandBus.dispatch(new CreateBoundedContextCommand(
            payload.id,
            payload.name,
            payload.root,
            payload.sort,
            payload.isActive,
            
        ));
        
        return await this.queryBus.ask(new FindBoundedContextByIdQuery(payload.id));
    }
}