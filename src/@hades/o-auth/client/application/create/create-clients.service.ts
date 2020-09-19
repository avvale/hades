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
import { AddClientsContextEvent } from './../events/add-clients-context.event';

@Injectable()
export class CreateClientsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IClientRepository
    ) {}

    public async main(
        clients: {
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
            
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateClients = clients.map(client => OAuthClient.register(
            client.id,
            client.grantType,
            client.name,
            client.secret,
            client.authUrl,
            client.redirect,
            client.resourceCodes,
            client.expiredAccessToken,
            client.expiredRefreshToken,
            client.isRevoked,
            client.isMaster,
            new ClientCreatedAt(Utils.nowTimestamp()),
            new ClientUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateClients);

        // create AddClientsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const clientsRegistered = this.publisher.mergeObjectContext(new AddClientsContextEvent(aggregateClients));
 
        clientsRegistered.created(); // apply event to model events
        clientsRegistered.commit(); // commit all events of model
    }
}