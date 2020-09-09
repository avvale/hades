import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminCreateRoleInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateRoleCommand } from '@hades/admin/role/application/create/create-role.command';
import { FindRoleByIdQuery } from '@hades/admin/role/application/find/find-role-by-id.query';

@Resolver()
export class CreateRoleResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminCreateRole')
    async main(@Args('payload') payload: AdminCreateRoleInput)
    {
        await this.commandBus.dispatch(new CreateRoleCommand(
            payload.id,
            payload.name,
            payload.isMaster,
            
        ));
        
        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id));
    }
}