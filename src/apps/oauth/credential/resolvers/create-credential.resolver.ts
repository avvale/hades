import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { OAuthCreateCredentialInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateCredentialCommand } from '@hades/oauth/credential/application/create/create-credential.command';

@Resolver()
export class CreateCredentialResolver
{
    constructor(
        private readonly commandBus: ICommandBus
    ) {}

    @Mutation('oAuthCreateCredential')
    async main(@Args('payload') payload: OAuthCreateCredentialInput)
    {
        await this.commandBus.dispatch(new CreateCredentialCommand(
            payload.username,
            payload.password,
            payload.grantType
        ));

        return {
            token_type: 'bearer',
            access_token: 'access_token_faker',
            refresh_token: 'refresh_token_faker',
            expires_in: '',
            scope: ''
        };
    }
}