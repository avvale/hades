import { AggregateRoot } from '@nestjs/cqrs';
import { 
    RefreshTokenId, 
    RefreshTokenAccessTokenId, 
    RefreshTokenToken, 
    RefreshTokenIsRevoked, 
    RefreshTokenExpiresAt, 
    RefreshTokenCreatedAt, 
    RefreshTokenUpdatedAt, 
    RefreshTokenDeletedAt
    
} from './value-objects';
import { CreatedRefreshTokenEvent } from './../application/events/created-refresh-token.event';
import { UpdatedRefreshTokenEvent } from './../application/events/updated-refresh-token.event';
import { DeletedRefreshTokenEvent } from './../application/events/deleted-refresh-token.event';
import { OAuthAccessToken } from '@hades/o-auth/access-token/domain/access-token.aggregate';

export class OAuthRefreshToken extends AggregateRoot
{
    id: RefreshTokenId;
    accessTokenId: RefreshTokenAccessTokenId;
    accessToken: OAuthAccessToken;
    token: RefreshTokenToken;
    isRevoked: RefreshTokenIsRevoked;
    expiresAt: RefreshTokenExpiresAt;
    createdAt: RefreshTokenCreatedAt;
    updatedAt: RefreshTokenUpdatedAt;
    deletedAt: RefreshTokenDeletedAt;
    
    constructor(id?: RefreshTokenId, accessTokenId?: RefreshTokenAccessTokenId, token?: RefreshTokenToken, isRevoked?: RefreshTokenIsRevoked, expiresAt?: RefreshTokenExpiresAt, createdAt?: RefreshTokenCreatedAt, updatedAt?: RefreshTokenUpdatedAt, deletedAt?: RefreshTokenDeletedAt, )
    {
        super();
        
        this.id = id;
        this.accessTokenId = accessTokenId;
        this.token = token;
        this.isRevoked = isRevoked;
        this.expiresAt = expiresAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: RefreshTokenId, accessTokenId: RefreshTokenAccessTokenId, token: RefreshTokenToken, isRevoked: RefreshTokenIsRevoked, expiresAt: RefreshTokenExpiresAt, createdAt: RefreshTokenCreatedAt, updatedAt: RefreshTokenUpdatedAt, deletedAt: RefreshTokenDeletedAt, ): OAuthRefreshToken
    {
        return new OAuthRefreshToken(id, accessTokenId, token, isRevoked, expiresAt, createdAt, updatedAt, deletedAt, );
    }

    created(refreshToken: OAuthRefreshToken): void
    {
        this.apply(
            new CreatedRefreshTokenEvent(
                refreshToken.id.value,
                refreshToken.accessTokenId.value,
                refreshToken.token.value,
                refreshToken.isRevoked.value,
                refreshToken.expiresAt?.value,
                refreshToken.createdAt?.value,
                refreshToken.updatedAt?.value,
                refreshToken.deletedAt?.value,
                
            )
        );
    }

    updated(refreshToken: OAuthRefreshToken): void
    {
        this.apply(
            new UpdatedRefreshTokenEvent(
                refreshToken.id.value,
                refreshToken.accessTokenId?.value,
                refreshToken.token?.value,
                refreshToken.isRevoked?.value,
                refreshToken.expiresAt?.value,
                refreshToken.createdAt?.value,
                refreshToken.updatedAt?.value,
                refreshToken.deletedAt?.value,
                
            )
        );
    }

    deleted(refreshToken: OAuthRefreshToken): void
    {
        this.apply(
            new DeletedRefreshTokenEvent(
                refreshToken.id.value,
                refreshToken.accessTokenId.value,
                refreshToken.token.value,
                refreshToken.isRevoked.value,
                refreshToken.expiresAt?.value,
                refreshToken.createdAt?.value,
                refreshToken.updatedAt?.value,
                refreshToken.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            accessTokenId: this.accessTokenId.value,
            token: this.token.value,
            isRevoked: this.isRevoked.value,
            expiresAt: this.expiresAt?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
