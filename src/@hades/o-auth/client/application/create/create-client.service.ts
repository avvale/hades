import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    ClientId, 
    ClientGrantType, 
    ClientName, 
    ClientSecret, 
    ClientAuthUrl, 
    ClientRedirect, 
    ClientResourceCodes, 
    ClientExpiredAccessToken, 
    ClientExpiredRefreshToken, 
    ClientIsRevoked, 
    ClientIsMaster, 
    ClientCreatedAt, 
    ClientUpdatedAt, 
    ClientDeletedAt
    
} from './../../domain/value-objects';
import { IClientRepository } from './../../domain/client.repository';
import { OAuthClient } from './../../domain/client.aggregate';

@Injectable()
export class CreateClientService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IClientRepository
    ) {}

    public async main(
        id: ClientId,
        grantType: ClientGrantType,
        name: ClientName,
        secret: ClientSecret,
        authUrl: ClientAuthUrl,
        redirect: ClientRedirect,
        resourceCodes: ClientResourceCodes,
        expiredAccessToken: ClientExpiredAccessToken,
        expiredRefreshToken: ClientExpiredRefreshToken,
        isRevoked: ClientIsRevoked,
        isMaster: ClientIsMaster,
        
    ): Promise<void>
    {
        // create object with factory pattern
        const client = OAuthClient.register(
            id,
            grantType,
            name,
            secret,
            authUrl,
            redirect,
            resourceCodes,
            expiredAccessToken,
            expiredRefreshToken,
            isRevoked,
            isMaster,
            new ClientCreatedAt(Utils.nowTimestamp()),
            new ClientUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // create
        await this.repository.create(client);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const clientRegister = this.publisher.mergeObjectContext(
            client
        );
        
        clientRegister.created(client); // apply event to model events
        clientRegister.commit(); // commit all events of model
    }
}