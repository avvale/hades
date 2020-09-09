import { AggregateRoot } from '@nestjs/cqrs';
import { 
    CredentialUsername, 
    CredentialPassword,
    CredentialGrantType,
    
} from './value-objects';
import { CreatedCredentialEvent } from './../application/events/created-credential.event';

export class OAuthCredential extends AggregateRoot
{
    username: CredentialUsername;
    password: CredentialPassword;
    grantType: CredentialGrantType;
    
    constructor(username?: CredentialUsername, password?: CredentialPassword, grantType?: CredentialGrantType)
    {
        super();
        
        this.username = username;
        this.password = password;
        this.grantType = grantType;
    }

    static register (username: CredentialUsername, password: CredentialPassword, grantType: CredentialGrantType): OAuthCredential
    {
        return new OAuthCredential(username, password, grantType);
    }

    created(credential: OAuthCredential): void
    {
        this.apply(
            new CreatedCredentialEvent(
                credential.username.value,
                credential.password.value,
                credential.grantType.value
            )
        );
    }

    toDTO(): Object
    {
        return {
            username: this.username.value,
            password: this.password.value,
            grantType: this.grantType.value
        }
    }
}
