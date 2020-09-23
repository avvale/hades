import { AggregateRoot } from '@nestjs/cqrs';
import { 
    AccessTokenId,
    AccessTokenClientId,
    AccessTokenToken,
    AccessTokenName,
    AccessTokenIsRevoked,
    AccessTokenExpiresAt,
    AccessTokenCreatedAt,
    AccessTokenUpdatedAt,
    AccessTokenDeletedAt
    
} from './value-objects';
import { CreatedAccessTokenEvent } from './../application/events/created-access-token.event';
import { UpdatedAccessTokenEvent } from './../application/events/updated-access-token.event';
import { DeletedAccessTokenEvent } from './../application/events/deleted-access-token.event';
import { OAuthClient } from '@hades/o-auth/client/domain/client.aggregate';

import { OAuthRefreshToken } from '@hades/o-auth/refresh-token/domain/refresh-token.aggregate';


export class OAuthAccessToken extends AggregateRoot
{
    id: AccessTokenId;
    clientId: AccessTokenClientId;
    token: AccessTokenToken;
    name: AccessTokenName;
    isRevoked: AccessTokenIsRevoked;
    expiresAt: AccessTokenExpiresAt;
    createdAt: AccessTokenCreatedAt;
    updatedAt: AccessTokenUpdatedAt;
    deletedAt: AccessTokenDeletedAt;
    
    // eager relationship
    client: OAuthClient;
    
    refreshToken: OAuthRefreshToken;
    
    
    constructor(id?: AccessTokenId, clientId?: AccessTokenClientId, token?: AccessTokenToken, name?: AccessTokenName, isRevoked?: AccessTokenIsRevoked, expiresAt?: AccessTokenExpiresAt, createdAt?: AccessTokenCreatedAt, updatedAt?: AccessTokenUpdatedAt, deletedAt?: AccessTokenDeletedAt, client?: OAuthClient, refreshToken?: OAuthRefreshToken, )
    {
        super();
        
        this.id = id;
        this.clientId = clientId;
        this.token = token;
        this.name = name;
        this.isRevoked = isRevoked;
        this.expiresAt = expiresAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
        // eager relationship
        this.client = client;
        
        this.refreshToken = refreshToken;
        
        
    }

    static register (id: AccessTokenId, clientId: AccessTokenClientId, token: AccessTokenToken, name: AccessTokenName, isRevoked: AccessTokenIsRevoked, expiresAt: AccessTokenExpiresAt, createdAt: AccessTokenCreatedAt, updatedAt: AccessTokenUpdatedAt, deletedAt: AccessTokenDeletedAt, client?: OAuthClient, refreshToken?: OAuthRefreshToken): OAuthAccessToken
    {
        return new OAuthAccessToken(id, clientId, token, name, isRevoked, expiresAt, createdAt, updatedAt, deletedAt, client, refreshToken, );
    }

    created(accessToken: OAuthAccessToken): void
    {
        this.apply(
            new CreatedAccessTokenEvent(
                accessToken.id.value,
                accessToken.clientId.value,
                accessToken.token.value,
                accessToken.name?.value,
                accessToken.isRevoked.value,
                accessToken.expiresAt?.value,
                accessToken.createdAt?.value,
                accessToken.updatedAt?.value,
                accessToken.deletedAt?.value,
                
            )
        );
    }

    updated(accessToken: OAuthAccessToken): void
    {
        this.apply(
            new UpdatedAccessTokenEvent(
                accessToken.id.value,
                accessToken.clientId?.value,
                accessToken.token?.value,
                accessToken.name?.value,
                accessToken.isRevoked?.value,
                accessToken.expiresAt?.value,
                accessToken.createdAt?.value,
                accessToken.updatedAt?.value,
                accessToken.deletedAt?.value,
                
            )
        );
    }

    deleted(accessToken: OAuthAccessToken): void
    {
        this.apply(
            new DeletedAccessTokenEvent(
                accessToken.id.value,
                accessToken.clientId.value,
                accessToken.token.value,
                accessToken.name?.value,
                accessToken.isRevoked.value,
                accessToken.expiresAt?.value,
                accessToken.createdAt?.value,
                accessToken.updatedAt?.value,
                accessToken.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            clientId: this.clientId.value,
            token: this.token.value,
            name: this.name?.value,
            isRevoked: this.isRevoked.value,
            expiresAt: this.expiresAt?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
            // eager relationship
            client: this.client?.toDTO(),
            
            refreshToken: this.refreshToken?.toDTO(),
            
            
        }
    }
}
