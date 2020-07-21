import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminCreatePermissionInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreatePermissionsCommand } from '@hades/admin/permission/application/create/create-permissions.command';

@Resolver()
export class CreatePermissionsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminCreatePermissions')
    async main(@Args('payload') payload: AdminCreatePermissionInput[])
    {
        await this.commandBus.dispatch(new CreatePermissionsCommand(payload));
        return true;
    }
}