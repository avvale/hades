import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { 
    CredentialUsername,
    CredentialPassword,
    CredentialGrantType,
} from './../../domain/value-objects';
import { OAuthCredential } from './../../domain/credential.aggregate';

@Injectable()
export class CreateCredentialService
{
    constructor(
        private readonly publisher: EventPublisher
    ) {}

    public async main(
        username: CredentialUsername,
        password: CredentialPassword,
        grantType: CredentialGrantType
    ): Promise<void>
    {
        // create object with factory pattern
        const credential = OAuthCredential.register(
            username,
            password,
            grantType
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