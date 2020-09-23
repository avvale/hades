import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamUpdatePermissionInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdatePermissionCommand } from '@hades/iam/permission/application/update/update-permission.command';
import { FindPermissionByIdQuery } from '@hades/iam/permission/application/find/find-permission-by-id.query';

@Resolver()
export class UpdatePermissionResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamUpdatePermission')
    async main(@Args('payload') payload: IamUpdatePermissionInput)
    {
        await this.commandBus.dispatch(new UpdatePermissionCommand(
            payload.id,
            payload.name,
            payload.boundedContextId,
            payload.roleIds,
            
        ));
        
        return await this.queryBus.ask(new FindPermissionByIdQuery(payload.id));
    }
}