import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { OAuthUpdateClientInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateClientCommand } from '@hades/o-auth/client/application/update/update-client.command';
import { FindClientByIdQuery } from '@hades/o-auth/client/application/find/find-client-by-id.query';

@Resolver()
export class UpdateClientResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthUpdateClient')
    async main(@Args('payload') payload: OAuthUpdateClientInput)
    {
        await this.commandBus.dispatch(new UpdateClientCommand(
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