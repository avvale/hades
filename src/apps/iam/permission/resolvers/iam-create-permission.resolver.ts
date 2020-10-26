import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreatePermissionCommand } from '@hades/iam/permission/application/create/create-permission.command';
import { FindPermissionByIdQuery } from '@hades/iam/permission/application/find/find-permission-by-id.query';
import { IamCreatePermissionInput } from './../../../../graphql';

@Resolver()
@Permissions('iam.permission.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreatePermissionResolver
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