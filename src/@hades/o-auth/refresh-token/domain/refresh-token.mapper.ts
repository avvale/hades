import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { OAuthRefreshToken } from './refresh-token.aggregate';
import { RefreshTokenResponse } from './refresh-token.response';
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

export class RefreshTokenMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param refreshToken
     */
    mapObjectToAggregate(refreshToken: ObjectLiteral): OAuthRefreshToken
    {
        return this.makeAggregate(refreshToken);
    }

    /**
     * Map array of objects to array aggregates
     * @param refreshTokens 
     */
    mapObjectsToAggregates(refreshTokens: ObjectLiteral[]): OAuthRefreshToken[]
    {
        return refreshTokens.map(refreshToken  => this.makeAggregate(refreshToken ));
    }

    /**
     * Map aggregate to response
     * @param refreshToken 
     */
    mapAggregateToResponse(refreshToken: OAuthRefreshToken): RefreshTokenResponse
    {
        return this.makeResponse(refreshToken);
    }

    /**
     * Map array of aggregates to array responses
     * @param refreshTokens
     */
    mapAggregatesToResponses(refreshTokens: OAuthRefreshToken[]): RefreshTokenResponse[]
    {
        return refreshTokens.map(refreshToken => this.makeResponse(refreshToken));
    }

    private makeAggregate(refreshToken: ObjectLiteral): OAuthRefreshToken
    {
        return OAuthRefreshToken.register(
            new RefreshTokenId(refreshToken.id),
            new RefreshTokenAccessTokenId(refreshToken.accessTokenId),
            new RefreshTokenToken(refreshToken.token),
            new RefreshTokenIsRevoked(refreshToken.isRevoked),
            new RefreshTokenExpiresAt(refreshToken.expiresAt),
            new RefreshTokenCreatedAt(refreshToken.createdAt),
            new RefreshTokenUpdatedAt(refreshToken.updatedAt),
            new RefreshTokenDeletedAt(refreshToken.deletedAt),
              
        );
    }

    private makeResponse(refreshToken: OAuthRefreshToken): RefreshTokenResponse
    {
        return new RefreshTokenResponse(
            refreshToken.id.value,
            refreshToken.accessTokenId.value,
            refreshToken.token.value,
            refreshToken.isRevoked.value,
            refreshToken.expiresAt.value,
            refreshToken.createdAt.value,
            refreshToken.updatedAt.value,
            refreshToken.deletedAt.value,
            
        );
    }
}