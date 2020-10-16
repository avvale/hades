import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateClientsCommand } from '@hades/o-auth/client/application/create/create-clients.command';
import { OAuthCreateClientInput } from './../../../../graphql';

@Resolver()
@Permissions('oAuth.client.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CreateClientsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthCreateClients')
    async main(@Args('payload') payload: OAuthCreateClientInput[])
    {
        await this.commandBus.dispatch(new CreateClientsCommand(payload));
        return true;
    }
}