import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminCreateModuleInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { CreateModuleCommand } from '@hades/admin/module/application/create/create-module.command';
import { FindModuleByIdQuery } from '@hades/admin/module/application/find/find-module-by-id.query';

@Resolver()
export class CreateModuleResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminCreateModule')
    async main(@Args('payload') payload: AdminCreateModuleInput)
    {
        await this.commandBus.dispatch(new CreateModuleCommand(
            payload.id,
            payload.name,
            payload.root,
            payload.sort,
            payload.isActive,
            
        ));
        
        return await this.queryBus.ask(new FindModuleByIdQuery(payload.id));
    }
}