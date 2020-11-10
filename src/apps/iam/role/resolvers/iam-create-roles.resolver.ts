import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateRolesCommand } from '@hades/iam/role/application/create/create-roles.command';
import { IamCreateRoleInput } from './../../../../graphql';

@Resolver()
@Permissions('iam.role.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreateRolesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamCreateRoles')
    async main(
        @Args('payload') payload: IamCreateRoleInput[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateRolesCommand(payload, { timezone }));
        return true;
    }
}