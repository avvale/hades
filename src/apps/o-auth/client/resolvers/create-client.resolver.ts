import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateClientCommand } from '@hades/o-auth/client/application/create/create-client.command';
import { FindClientByIdQuery } from '@hades/o-auth/client/application/find/find-client-by-id.query';
import { OAuthCreateClientInput } from './../../../../graphql';

@Resolver()
@Permissions('oAuth.client.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CreateClientResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthCreateClient')
    async main(@Args('payload') payload: OAuthCreateClientInput)
    {
        await this.commandBus.dispatch(new CreateClientCommand(
            payload.id,
            payload.grantType,
            payload.name,
            payload.secret,
            payload.authUrl,
            payload.redirect,
            payload.expiredAccessToken,
            payload.expiredRefreshToken,
            payload.isRevoked,
            payload.isMaster,
            payload.applicationIds,
        ));
        
        return await this.queryBus.ask(new FindClientByIdQuery(payload.id));
    }
}