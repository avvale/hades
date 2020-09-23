import { AggregateRoot } from '@nestjs/cqrs';
import { 
    CredentialGrantType,
    CredentialUsername,
    CredentialPassword,
    CredentialAccessTokenId,
    CredentialRefreshToken,
    CredentialClientSecret,
    CredentialRedirect
    
} from './value-objects';
import { CreatedCredentialEvent } from './../application/events/created-credential.event';

export class OAuthCredential extends AggregateRoot
{
    grantType: CredentialGrantType;
    username: CredentialUsername;
    password: CredentialPassword;
    accessTokenId: CredentialAccessTokenId;
    refreshToken: CredentialRefreshToken;
    clientSecret: CredentialClientSecret;
    redirect: CredentialRedirect;
    
    constructor(grantType?: CredentialGrantType, username?: CredentialUsername, password?: CredentialPassword, accessTokenId?: CredentialAccessTokenId, refreshToken?: CredentialRefreshToken, clientSecret?: CredentialClientSecret, redirect?: CredentialRedirect, )
    {
        super();
        
        this.grantType = grantType;
        this.username = username;
        this.password = password;
        this.accessTokenId = accessTokenId;
        this.refreshToken = refreshToken;
        this.clientSecret = clientSecret;
        this.redirect = redirect;
    }

    static register (grantType: CredentialGrantType, username: CredentialUsername, password: CredentialPassword, accessTokenId: CredentialAccessTokenId, refreshToken: CredentialRefreshToken, clientSecret: CredentialClientSecret, redirect: CredentialRedirect, ): OAuthCredential
    {
        return new OAuthCredential(grantType, username, password, accessTokenId, refreshToken, clientSecret, redirect, );
    }

    created(credential: OAuthCredential): void
    {
        this.apply(
            new CreatedCredentialEvent(
                credential.grantType.value,
                credential.username?.value,
                credential.password?.value,
                credential.accessTokenId?.value,
                credential.refreshToken?.value,
                credential.clientSecret?.value,
                credential.redirect?.value,
            )
        );
    }

    toDTO(): Object
    {
        return {
            grantType: this.grantType.value,
            username: this.username?.value,
            password: this.password?.value,
            accessTokenId: this.accessTokenId?.value,
            refreshToken: this.refreshToken?.value,
            clientSecret: this.clientSecret?.value,
            redirect: this.redirect?.value
        }
    }
}
