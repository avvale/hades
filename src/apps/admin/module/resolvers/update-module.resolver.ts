import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminUpdateModuleInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdateModuleCommand } from '@hades/admin/module/application/update/update-module.command';
import { FindModuleByIdQuery } from '@hades/admin/module/application/find/find-module-by-id.query';

@Resolver()
export class UpdateModuleResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminUpdateModule')
    async main(@Args('payload') payload: AdminUpdateModuleInput)
    {
        await this.commandBus.dispatch(new UpdateModuleCommand(
            payload.id,
            payload.name,
            payload.root,
            payload.sort,
            payload.isActive,
            
        ));
        
        return await this.queryBus.ask(new FindModuleByIdQuery(payload.id));
    }
}