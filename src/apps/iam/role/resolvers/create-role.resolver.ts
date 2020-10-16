import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateRoleCommand } from '@hades/iam/role/application/create/create-role.command';
import { FindRoleByIdQuery } from '@hades/iam/role/application/find/find-role-by-id.query';
import { IamCreateRoleInput } from './../../../../graphql';

@Resolver()
@Permissions('iam.role.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
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