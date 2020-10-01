import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamUpdateRoleInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateRoleCommand } from '@hades/iam/role/application/update/update-role.command';
import { FindRoleByIdQuery } from '@hades/iam/role/application/find/find-role-by-id.query';

@Resolver()
export class UpdateRoleResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamUpdateRole')
    async main(@Args('payload') payload: IamUpdateRoleInput)
    {
        await this.commandBus.dispatch(new UpdateRoleCommand(
            payload.id,
            payload.name,
            payload.isMaster,
            payload.permissionIds,
            payload.accountIds,
            
        ));
        
        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id));
    }
}