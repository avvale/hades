import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamCreatePermissionInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreatePermissionCommand } from '@hades/iam/permission/application/create/create-permission.command';
import { FindPermissionByIdQuery } from '@hades/iam/permission/application/find/find-permission-by-id.query';

@Resolver()
export class CreatePermissionResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamCreatePermission')
    async main(@Args('payload') payload: IamCreatePermissionInput)
    {
        await this.commandBus.dispatch(new CreatePermissionCommand(
            payload.id,
            payload.name,
            payload.boundedContextId,
            payload.roleIds,
            
        ));
        
        return await this.queryBus.ask(new FindPermissionByIdQuery(payload.id));
    }
}