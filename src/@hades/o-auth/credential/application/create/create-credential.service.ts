import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { 
    CredentialGrantType,
    CredentialUsername,
    CredentialPassword,
    CredentialAccessTokenId,
    CredentialRefreshToken,
    CredentialClientSecret,
    CredentialRedirect
    
} from '../../domain/value-objects';
import { OAuthCredential } from './../../domain/credential.aggregate';

@Injectable()
export class CreateCredentialService
{
    constructor(
        private readonly publisher: EventPublisher,
       // private readonly repository: ICredentialRepository
    ) {}

    public async main(
        grantType: CredentialGrantType,
        username: CredentialUsername,
        password: CredentialPassword,
        accessTokenId: CredentialAccessTokenId,
        refreshToken: CredentialRefreshToken,
        clientSecret: CredentialClientSecret,
        redirect: CredentialRedirect,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const credential = OAuthCredential.register(
            grantType,
            username,
            password,
            accessTokenId,
            refreshToken,
            clientSecret,
            redirect
        );
        
        // create
        // await this.repository.create(credential);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const credentialRegister = this.publisher.mergeObjectContext(
            credential
        );
        
        credentialRegister.created(credential); // apply event to model events
        credentialRegister.commit(); // commit all events of model
    }
}