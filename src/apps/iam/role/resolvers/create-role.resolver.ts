import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamCreateRoleInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateRoleCommand } from '@hades/iam/role/application/create/create-role.command';
import { FindRoleByIdQuery } from '@hades/iam/role/application/find/find-role-by-id.query';

@Resolver()
export class CreateRoleResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamCreateRole')
    async main(@Args('payload') payload: IamCreateRoleInput)
    {
        await this.commandBus.dispatch(new CreateRoleCommand(
            payload.id,
            payload.name,
            payload.isMaster,
            payload.permissionIds,
            payload.accountIds,
            
        ));
        
        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id));
    }
}