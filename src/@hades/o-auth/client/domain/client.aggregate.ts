import { AggregateRoot } from '@nestjs/cqrs';
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
import { CreatedClientEvent } from './../application/events/created-client.event';
import { UpdatedClientEvent } from './../application/events/updated-client.event';
import { DeletedClientEvent } from './../application/events/deleted-client.event';

export class OAuthClient extends AggregateRoot
{
    id: ClientId;
    grantType: ClientGrantType;
    name: ClientName;
    secret: ClientSecret;
    authUrl: ClientAuthUrl;
    redirect: ClientRedirect;
    resourceCodes: ClientResourceCodes;
    expiredAccessToken: ClientExpiredAccessToken;
    expiredRefreshToken: ClientExpiredRefreshToken;
    isRevoked: ClientIsRevoked;
    isMaster: ClientIsMaster;
    createdAt: ClientCreatedAt;
    updatedAt: ClientUpdatedAt;
    deletedAt: ClientDeletedAt;
    
    constructor(id?: ClientId, grantType?: ClientGrantType, name?: ClientName, secret?: ClientSecret, authUrl?: ClientAuthUrl, redirect?: ClientRedirect, resourceCodes?: ClientResourceCodes, expiredAccessToken?: ClientExpiredAccessToken, expiredRefreshToken?: ClientExpiredRefreshToken, isRevoked?: ClientIsRevoked, isMaster?: ClientIsMaster, createdAt?: ClientCreatedAt, updatedAt?: ClientUpdatedAt, deletedAt?: ClientDeletedAt, )
    {
        super();
        
        this.id = id;
        this.grantType = grantType;
        this.name = name;
        this.secret = secret;
        this.authUrl = authUrl;
        this.redirect = redirect;
        this.resourceCodes = resourceCodes;
        this.expiredAccessToken = expiredAccessToken;
        this.expiredRefreshToken = expiredRefreshToken;
        this.isRevoked = isRevoked;
        this.isMaster = isMaster;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: ClientId, grantType: ClientGrantType, name: ClientName, secret: ClientSecret, authUrl: ClientAuthUrl, redirect: ClientRedirect, resourceCodes: ClientResourceCodes, expiredAccessToken: ClientExpiredAccessToken, expiredRefreshToken: ClientExpiredRefreshToken, isRevoked: ClientIsRevoked, isMaster: ClientIsMaster, createdAt: ClientCreatedAt, updatedAt: ClientUpdatedAt, deletedAt: ClientDeletedAt, ): OAuthClient
    {
        return new OAuthClient(id, grantType, name, secret, authUrl, redirect, resourceCodes, expiredAccessToken, expiredRefreshToken, isRevoked, isMaster, createdAt, updatedAt, deletedAt, );
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
                client.resourceCodes.value,
                client.expiredAccessToken?.value,
                client.expiredRefreshToken?.value,
                client.isRevoked.value,
                client.isMaster.value,
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
                client.resourceCodes?.value,
                client.expiredAccessToken?.value,
                client.expiredRefreshToken?.value,
                client.isRevoked?.value,
                client.isMaster?.value,
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
                client.resourceCodes.value,
                client.expiredAccessToken?.value,
                client.expiredRefreshToken?.value,
                client.isRevoked.value,
                client.isMaster.value,
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
            resourceCodes: this.resourceCodes.value,
            expiredAccessToken: this.expiredAccessToken?.value,
            expiredRefreshToken: this.expiredRefreshToken?.value,
            isRevoked: this.isRevoked.value,
            isMaster: this.isMaster.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
