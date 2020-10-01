import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamUpdateBoundedContextInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateBoundedContextCommand } from '@hades/iam/bounded-context/application/update/update-bounded-context.command';
import { FindBoundedContextByIdQuery } from '@hades/iam/bounded-context/application/find/find-bounded-context-by-id.query';

@Resolver()
export class UpdateBoundedContextResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamUpdateBoundedContext')
    async main(@Args('payload') payload: IamUpdateBoundedContextInput)
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