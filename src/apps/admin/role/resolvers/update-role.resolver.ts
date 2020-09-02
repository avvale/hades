import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminUpdateRoleInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateRoleCommand } from '@hades/admin/role/application/update/update-role.command';
import { FindRoleByIdQuery } from '@hades/admin/role/application/find/find-role-by-id.query';

@Resolver()
export class UpdateRoleResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminUpdateRole')
    async main(@Args('payload') payload: AdminUpdateRoleInput)
    {
        await this.commandBus.dispatch(new UpdateRoleCommand(
            payload.id,
            payload.name,
            payload.isMaster,
            
        ));
        
        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id));
    }
}