import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminCreatePermissionInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { InsertPermissionsCommand } from '@hades/admin/permission/application/insert/insert-permissions.command';

@Resolver()
export class InsertPermissionsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminInsertPermissions')
    async main(@Args('payload') payload: AdminCreatePermissionInput[])
    {
        await this.commandBus.dispatch(new InsertPermissionsCommand(payload));
        return true;
    }
}