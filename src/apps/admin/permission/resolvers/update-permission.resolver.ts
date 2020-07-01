import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminUpdatePermissionInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdatePermissionCommand } from '@hades/admin/permission/application/update/update-permission.command';
import { FindPermissionByIdQuery } from '@hades/admin/permission/application/find/find-permission-by-id.query';

@Resolver()
export class UpdatePermissionResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminUpdatePermission')
    async main(@Args('payload') payload: AdminUpdatePermissionInput)
    {
        await this.commandBus.dispatch(new UpdatePermissionCommand(
            payload.id,
            payload.moduleId,
            payload.name,
            
        ));
        
        return await this.queryBus.ask(new FindPermissionByIdQuery(payload.id));
    }
}