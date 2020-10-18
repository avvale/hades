import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { OAuthClientGrantType, OAuthCreateCredentialInput } from '../../../../graphql';

// custom
import { PasswordGrantService } from '../lib/password-grant.service';

@Resolver()
export class CreateCredentialResolver
{
    constructor(
        private readonly passwordGrantService: PasswordGrantService
    ) {}

    @Mutation('oAuthCreateCredential')
    async main(@Args('payload') payload: OAuthCreateCredentialInput, @Context() context)
    {
        if (payload.grantType === OAuthClientGrantType.AUTHORIZATION_CODE)
        {

        }

        if (payload.grantType === OAuthClientGrantType.CLIENT_CREDENTIALS)
        {

        }

        if (payload.grantType === OAuthClientGrantType.PASSWORD)
        {
            return this.passwordGrantService.getCredential(payload, context);
        }
    }
}