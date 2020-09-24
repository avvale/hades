import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral } from '@hades/shared/domain/lib/hades.types';
import { OAuthClient } from './client.aggregate';
import { ClientResponse } from './client.response';
import { 
    ClientId,
    ClientGrantType,
    ClientName,
    ClientSecret,
    ClientAuthUrl,
    ClientRedirect,
    ClientExpiredAccessToken,
    ClientExpiredRefreshToken,
    ClientIsRevoked,
    ClientIsMaster,
    ClientApplicationIds,
    ClientCreatedAt,
    ClientUpdatedAt,
    ClientDeletedAt
    
} from './value-objects';


import { AccessTokenMapper } from '@hades/o-auth/access-token/domain/access-token.mapper';

import { ApplicationMapper } from '@hades/o-auth/application/domain/application.mapper';

export class ClientMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true }
    ) {}
    
    /**
     * Map object to aggregate
     * @param client
     */
    mapModelToAggregate(client: ObjectLiteral): OAuthClient
    {
        if (!client) return;

        return this.makeAggregate(client);
    }

    /**
     * Map array of objects to array aggregates
     * @param clients 
     */
    mapModelsToAggregates(clients: ObjectLiteral[]): OAuthClient[]
    {
        if (!Array.isArray(clients)) return;
        
        return clients.map(client  => this.makeAggregate(client));
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
        if (!Array.isArray(clients)) return;

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
            new ClientExpiredAccessToken(client.expiredAccessToken),
            new ClientExpiredRefreshToken(client.expiredRefreshToken),
            new ClientIsRevoked(client.isRevoked),
            new ClientIsMaster(client.isMaster),
            new ClientApplicationIds(client.applicationIds),
            new ClientCreatedAt(client.createdAt),
            new ClientUpdatedAt(client.updatedAt),
            new ClientDeletedAt(client.deletedAt),
            
            
            
            
            this.options.eagerLoading ? new AccessTokenMapper({ eagerLoading: false }).mapModelsToAggregates(client.accessTokens) : undefined,
            
            this.options.eagerLoading ? new ApplicationMapper({ eagerLoading: false }).mapModelsToAggregates(client.applications) : undefined,
            
        );
    }

    private makeResponse(client: OAuthClient): ClientResponse
    {
        if (!client) return;
        
        return new ClientResponse(
            client.id.value,
            client.grantType.value,
            client.name.value,
            client.secret.value,
            client.authUrl.value,
            client.redirect.value,
            client.expiredAccessToken.value,
            client.expiredRefreshToken.value,
            client.isRevoked.value,
            client.isMaster.value,
            client.applicationIds.value,
            client.createdAt.value,
            client.updatedAt.value,
            client.deletedAt.value,
            
            
            
            
            this.options.eagerLoading ? new AccessTokenMapper({ eagerLoading: false }).mapAggregatesToResponses(client.accessTokens) : undefined,
            
            this.options.eagerLoading ? new ApplicationMapper({ eagerLoading: false }).mapAggregatesToResponses(client.applications) : undefined,
            
        );
    }
}