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
import { CreateApplicationsCommand } from '@hades/o-auth/application/application/create/create-applications.command';
import { OAuthCreateApplicationInput } from './../../../../graphql';

@Resolver()
@Permissions('oAuth.application.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthCreateApplicationsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('oAuthCreateApplications')
    async main(
        @Args('payload') payload: OAuthCreateApplicationInput[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateApplicationsCommand(payload, { timezone }));
        return true;
    }
}