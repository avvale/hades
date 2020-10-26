import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreatePermissionsCommand } from '@hades/iam/permission/application/create/create-permissions.command';
import { IamCreatePermissionInput } from './../../../../graphql';

@Resolver()
@Permissions('iam.permission.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreatePermissionsResolver
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