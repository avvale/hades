import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateClientCommand } from '@hades/o-auth/client/application/create/create-client.command';
import { FindClientByIdQuery } from '@hades/o-auth/client/application/find/find-client-by-id.query';
import { OAuthCreateClientInput } from './../../../../graphql';

@Resolver()
@Permissions('oAuth.client.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthCreateClientResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('oAuthCreateClient')
    async main(
        @Args('payload') payload: OAuthCreateClientInput,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateClientCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindClientByIdQuery(payload.id, {}, { timezone }));
    }
}