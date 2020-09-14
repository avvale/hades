import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { OAuthAccessToken } from './access-token.aggregate';
import { AccessTokenResponse } from './access-token.response';
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

export class AccessTokenMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param accessToken
     */
    mapObjectToAggregate(accessToken: ObjectLiteral): OAuthAccessToken
    {
        return this.makeAggregate(accessToken);
    }

    /**
     * Map array of objects to array aggregates
     * @param accessTokens 
     */
    mapObjectsToAggregates(accessTokens: ObjectLiteral[]): OAuthAccessToken[]
    {
        return accessTokens.map(accessToken  => this.makeAggregate(accessToken ));
    }

    /**
     * Map aggregate to response
     * @param accessToken 
     */
    mapAggregateToResponse(accessToken: OAuthAccessToken): AccessTokenResponse
    {
        return this.makeResponse(accessToken);
    }

    /**
     * Map array of aggregates to array responses
     * @param accessTokens
     */
    mapAggregatesToResponses(accessTokens: OAuthAccessToken[]): AccessTokenResponse[]
    {
        return accessTokens.map(accessToken => this.makeResponse(accessToken));
    }

    private makeAggregate(accessToken: ObjectLiteral): OAuthAccessToken
    {
        return OAuthAccessToken.register(
            new AccessTokenId(accessToken.id),
            new AccessTokenClientId(accessToken.clientId),
            new AccessTokenToken(accessToken.token),
            new AccessTokenName(accessToken.name),
            new AccessTokenIsRevoked(accessToken.isRevoked),
            new AccessTokenExpiresAt(accessToken.expiresAt),
            new AccessTokenCreatedAt(accessToken.createdAt),
            new AccessTokenUpdatedAt(accessToken.updatedAt),
            new AccessTokenDeletedAt(accessToken.deletedAt),
              
        );
    }

    private makeResponse(accessToken: OAuthAccessToken): AccessTokenResponse
    {
        return new AccessTokenResponse(
            accessToken.id.value,
            accessToken.clientId.value,
            accessToken.token.value,
            accessToken.name.value,
            accessToken.isRevoked.value,
            accessToken.expiresAt.value,
            accessToken.createdAt.value,
            accessToken.updatedAt.value,
            accessToken.deletedAt.value,
            
        );
    }
}