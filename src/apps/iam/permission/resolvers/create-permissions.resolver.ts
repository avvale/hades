import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamCreatePermissionInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreatePermissionsCommand } from '@hades/iam/permission/application/create/create-permissions.command';

@Resolver()
export class CreatePermissionsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamCreatePermissions')
    async main(@Args('payload') payload: IamCreatePermissionInput[])
    {
        await this.commandBus.dispatch(new CreatePermissionsCommand(payload));
        return true;
    }
}