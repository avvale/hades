import { AggregateRoot } from '@nestjs/cqrs';
import { 
    ClientId,
    ClientGrantType,
    ClientName,
    ClientSecret,
    ClientAuthUrl,
    ClientRedirect,
    ClientApplicationCodes,
    ClientExpiredAccessToken,
    ClientExpiredRefreshToken,
    ClientIsRevoked,
    ClientIsMaster,
    ClientApplicationIds,
    ClientCreatedAt,
    ClientUpdatedAt,
    ClientDeletedAt
    
} from './value-objects';
import { CreatedClientEvent } from './../application/events/created-client.event';
import { UpdatedClientEvent } from './../application/events/updated-client.event';
import { DeletedClientEvent } from './../application/events/deleted-client.event';

import { OAuthAccessToken } from '@hades/o-auth/access-token/domain/access-token.aggregate';

import { OAuthApplication } from '@hades/o-auth/application/domain/application.aggregate';

export class OAuthClient extends AggregateRoot
{
    id: ClientId;
    grantType: ClientGrantType;
    name: ClientName;
    secret: ClientSecret;
    authUrl: ClientAuthUrl;
    redirect: ClientRedirect;
    applicationCodes: ClientApplicationCodes;
    expiredAccessToken: ClientExpiredAccessToken;
    expiredRefreshToken: ClientExpiredRefreshToken;
    isRevoked: ClientIsRevoked;
    isMaster: ClientIsMaster;
    applicationIds: ClientApplicationIds;
    createdAt: ClientCreatedAt;
    updatedAt: ClientUpdatedAt;
    deletedAt: ClientDeletedAt;
    
    // eager relationship
    
    accessTokens: OAuthAccessToken[];
    
    applications: OAuthApplication[];
    
    constructor(id?: ClientId, grantType?: ClientGrantType, name?: ClientName, secret?: ClientSecret, authUrl?: ClientAuthUrl, redirect?: ClientRedirect, applicationCodes?: ClientApplicationCodes, expiredAccessToken?: ClientExpiredAccessToken, expiredRefreshToken?: ClientExpiredRefreshToken, isRevoked?: ClientIsRevoked, isMaster?: ClientIsMaster, applicationIds?: ClientApplicationIds, createdAt?: ClientCreatedAt, updatedAt?: ClientUpdatedAt, deletedAt?: ClientDeletedAt, accessTokens?: OAuthAccessToken[], applications?: OAuthApplication[], )
    {
        super();
        
        this.id = id;
        this.grantType = grantType;
        this.name = name;
        this.secret = secret;
        this.authUrl = authUrl;
        this.redirect = redirect;
        this.applicationCodes = applicationCodes;
        this.expiredAccessToken = expiredAccessToken;
        this.expiredRefreshToken = expiredRefreshToken;
        this.isRevoked = isRevoked;
        this.isMaster = isMaster;
        this.applicationIds = applicationIds;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
        // eager relationship
        
        this.accessTokens = accessTokens;
        
        this.applications = applications;
        
    }

    static register (id: ClientId, grantType: ClientGrantType, name: ClientName, secret: ClientSecret, authUrl: ClientAuthUrl, redirect: ClientRedirect, applicationCodes: ClientApplicationCodes, expiredAccessToken: ClientExpiredAccessToken, expiredRefreshToken: ClientExpiredRefreshToken, isRevoked: ClientIsRevoked, isMaster: ClientIsMaster, applicationIds: ClientApplicationIds, createdAt: ClientCreatedAt, updatedAt: ClientUpdatedAt, deletedAt: ClientDeletedAt, accessTokens?: OAuthAccessToken[], applications?: OAuthApplication[], ): OAuthClient
    {
        return new OAuthClient(id, grantType, name, secret, authUrl, redirect, applicationCodes, expiredAccessToken, expiredRefreshToken, isRevoked, isMaster, applicationIds, createdAt, updatedAt, deletedAt, accessTokens, applications, );
    }

    created(client: OAuthClient): void
    {
        this.apply(
            new CreatedClientEvent(
                client.id.value,
                client.grantType.value,
                client.name.value,
                client.secret.value,
                client.authUrl?.value,
                client.redirect?.value,
                client.applicationCodes.value,
                client.expiredAccessToken?.value,
                client.expiredRefreshToken?.value,
                client.isRevoked.value,
                client.isMaster.value,
                client.applicationIds?.value,
                client.createdAt?.value,
                client.updatedAt?.value,
                client.deletedAt?.value,
                
            )
        );
    }

    updated(client: OAuthClient): void
    {
        this.apply(
            new UpdatedClientEvent(
                client.id.value,
                client.grantType?.value,
                client.name?.value,
                client.secret?.value,
                client.authUrl?.value,
                client.redirect?.value,
                client.applicationCodes?.value,
                client.expiredAccessToken?.value,
                client.expiredRefreshToken?.value,
                client.isRevoked?.value,
                client.isMaster?.value,
                client.applicationIds?.value,
                client.createdAt?.value,
                client.updatedAt?.value,
                client.deletedAt?.value,
                
            )
        );
    }

    deleted(client: OAuthClient): void
    {
        this.apply(
            new DeletedClientEvent(
                client.id.value,
                client.grantType.value,
                client.name.value,
                client.secret.value,
                client.authUrl?.value,
                client.redirect?.value,
                client.applicationCodes.value,
                client.expiredAccessToken?.value,
                client.expiredRefreshToken?.value,
                client.isRevoked.value,
                client.isMaster.value,
                client.applicationIds?.value,
                client.createdAt?.value,
                client.updatedAt?.value,
                client.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            grantType: this.grantType.value,
            name: this.name.value,
            secret: this.secret.value,
            authUrl: this.authUrl?.value,
            redirect: this.redirect?.value,
            applicationCodes: this.applicationCodes.value,
            expiredAccessToken: this.expiredAccessToken?.value,
            expiredRefreshToken: this.expiredRefreshToken?.value,
            isRevoked: this.isRevoked.value,
            isMaster: this.isMaster.value,
            applicationIds: this.applicationIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
            // eager relationship
            
            accessTokens: this.accessTokens?.map(item => item.toDTO()),
            
            applications: this.applications?.map(item => item.toDTO()),
            
        }
    }
}
