import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { OAuthClientGrantType, OAuthCreateCredentialInput } from './../../../../graphql';

// custom
import { ClientCredentialsGrantService } from './../lib/client-credentials-grant.service';
import { PasswordGrantService } from './../lib/password-grant.service';

@Resolver()
export class OAuthCreateCredentialResolver
{
    constructor(
        private readonly clientClientGrantService: ClientCredentialsGrantService,
        private readonly passwordGrantService: PasswordGrantService,
    ) {}

    @Mutation('oAuthCreateCredential')
    async main(@Args('payload') payload: OAuthCreateCredentialInput, @Context() context)
    {
        if (payload.grantType === OAuthClientGrantType.AUTHORIZATION_CODE)
        {

        }

        if (payload.grantType === OAuthClientGrantType.CLIENT_CREDENTIALS)
        {
            return this.clientClientGrantService.getCredential(payload);
        }

        if (payload.grantType === OAuthClientGrantType.PASSWORD)
        {
            return this.passwordGrantService.getCredential(payload, context.req.headers.authorization);
        }
    }
}