import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { OAuthCreateClientInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateClientCommand } from '@hades/o-auth/client/application/create/create-client.command';
import { FindClientByIdQuery } from '@hades/o-auth/client/application/find/find-client-by-id.query';

@Resolver()
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
            payload.resourceCodes,
            payload.expiredAccessToken,
            payload.expiredRefreshToken,
            payload.isRevoked,
            payload.isMaster,
            
        ));
        
        return await this.queryBus.ask(new FindClientByIdQuery(payload.id));
    }
}