import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { OAuthClient } from './client.aggregate';
import { ClientResponse } from './client.response';
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
    
} from './value-objects';

export class ClientMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param client
     */
    mapObjectToAggregate(client: ObjectLiteral): OAuthClient
    {
        return this.makeAggregate(client);
    }

    /**
     * Map array of objects to array aggregates
     * @param clients 
     */
    mapObjectsToAggregates(clients: ObjectLiteral[]): OAuthClient[]
    {
        return clients.map(client  => this.makeAggregate(client ));
    }

    /**
     * Map aggregate to response
     * @param client 
     */
    mapAggregateToResponse(client: OAuthClient): ClientResponse
    {
        return this.makeResponse(client);
    }

    /**
     * Map array of aggregates to array responses
     * @param clients
     */
    mapAggregatesToResponses(clients: OAuthClient[]): ClientResponse[]
    {
        return clients.map(client => this.makeResponse(client));
    }

    private makeAggregate(client: ObjectLiteral): OAuthClient
    {
        return OAuthClient.register(
            new ClientId(client.id),
            new ClientGrantType(client.grantType),
            new ClientName(client.name),
            new ClientSecret(client.secret),
            new ClientAuthUrl(client.authUrl),
            new ClientRedirect(client.redirect),
            new ClientResourceCodes(client.resourceCodes),
            new ClientExpiredAccessToken(client.expiredAccessToken),
            new ClientExpiredRefreshToken(client.expiredRefreshToken),
            new ClientIsRevoked(client.isRevoked),
            new ClientIsMaster(client.isMaster),
            new ClientCreatedAt(client.createdAt),
            new ClientUpdatedAt(client.updatedAt),
            new ClientDeletedAt(client.deletedAt),
              
        );
    }

    private makeResponse(client: OAuthClient): ClientResponse
    {
        return new ClientResponse(
            client.id.value,
            client.grantType.value,
            client.name.value,
            client.secret.value,
            client.authUrl.value,
            client.redirect.value,
            client.resourceCodes.value,
            client.expiredAccessToken.value,
            client.expiredRefreshToken.value,
            client.isRevoked.value,
            client.isMaster.value,
            client.createdAt.value,
            client.updatedAt.value,
            client.deletedAt.value,
            
        );
    }
}