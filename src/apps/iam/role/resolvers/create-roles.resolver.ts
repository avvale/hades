import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamCreateRoleInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateRolesCommand } from '@hades/iam/role/application/create/create-roles.command';

@Resolver()
export class CreateRolesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamCreateRoles')
    async main(@Args('payload') payload: IamCreateRoleInput[])
    {
        await this.commandBus.dispatch(new CreateRolesCommand(payload));
        return true;
    }
}