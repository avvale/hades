import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { OAuthCreateCredentialInput } from './../../../../graphql';
import { v4 as uuidv4 } from 'uuid';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateCredentialCommand } from '@hades/o-auth/credential/application/create/create-credential.command';
import { FindAccessTokenByIdQuery } from '@hades/o-auth/access-token/application/find/find-access-token-by-id.query';

@Resolver()
export class CreateCredentialsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthCreateCredentials')
    async main(@Args('payload') payload: OAuthCreateCredentialInput)
    {
        const accessTokenId = uuidv4(); // generate uuid for access token

        await this.commandBus.dispatch(new CreateCredentialCommand(
            payload.grantType,
            payload.username,
            payload.password,
            accessTokenId,
            payload.refreshToken,
            payload.clientSecret,
            payload.redirect
        ));
        
        return await this.queryBus.ask(new FindAccessTokenByIdQuery(accessTokenId));
    }
}