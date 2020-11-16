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
import { CreateUserCommand } from '@hades/iam/user/application/create/create-user.command';
import { FindUserByIdQuery } from '@hades/iam/user/application/find/find-user-by-id.query';
import { IamCreateUserInput } from './../../../../graphql';

@Resolver()
@Permissions('iam.user.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreateUserResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamCreateUser')
    async main(
        @Args('payload') payload: IamCreateUserInput,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateUserCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindUserByIdQuery(payload.id, {}, { timezone }));
    }
}