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
import { CreateBoundedContextsCommand } from '@hades/iam/bounded-context/application/create/create-bounded-contexts.command';
import { IamCreateBoundedContextInput } from './../../../../graphql';

@Resolver()
@Permissions('iam.boundedContext.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreateBoundedContextsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamCreateBoundedContexts')
    async main(
        @Args('payload') payload: IamCreateBoundedContextInput[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateBoundedContextsCommand(payload, { timezone }));
        return true;
    }
}