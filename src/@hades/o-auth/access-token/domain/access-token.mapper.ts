import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral } from '@hades/shared/domain/lib/hades.types';
import { OAuthAccessToken } from './access-token.aggregate';
import { AccessTokenResponse } from './access-token.response';
import { 
    AccessTokenId,
    AccessTokenClientId,
    AccessTokenAccountId,
    AccessTokenToken,
    AccessTokenName,
    AccessTokenIsRevoked,
    AccessTokenExpiresAt,
    AccessTokenCreatedAt,
    AccessTokenUpdatedAt,
    AccessTokenDeletedAt
    
} from './value-objects';
import { RefreshTokenMapper } from '@hades/o-auth/refresh-token/domain/refresh-token.mapper';

import { ClientMapper } from '@hades/o-auth/client/domain/client.mapper';



export class AccessTokenMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true }
    ) {}
    
    /**
     * Map object to aggregate
     * @param accessToken
     */
    mapModelToAggregate(accessToken: ObjectLiteral): OAuthAccessToken
    {
        if (!accessToken) return;

        return this.makeAggregate(accessToken);
    }

    /**
     * Map array of objects to array aggregates
     * @param accessTokens 
     */
    mapModelsToAggregates(accessTokens: ObjectLiteral[]): OAuthAccessToken[]
    {
        if (!Array.isArray(accessTokens)) return;
        
        return accessTokens.map(accessToken  => this.makeAggregate(accessToken));
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
        if (!Array.isArray(accessTokens)) return;

        return accessTokens.map(accessToken => this.makeResponse(accessToken));
    }

    private makeAggregate(accessToken: ObjectLiteral): OAuthAccessToken
    {
        return OAuthAccessToken.register(
            new AccessTokenId(accessToken.id),
            new AccessTokenClientId(accessToken.clientId),
            new AccessTokenAccountId(accessToken.accountId),
            new AccessTokenToken(accessToken.token),
            new AccessTokenName(accessToken.name),
            new AccessTokenIsRevoked(accessToken.isRevoked),
            new AccessTokenExpiresAt(accessToken.expiresAt),
            new AccessTokenCreatedAt(accessToken.createdAt),
            new AccessTokenUpdatedAt(accessToken.updatedAt),
            new AccessTokenDeletedAt(accessToken.deletedAt),
            
            
            this.options.eagerLoading ? new RefreshTokenMapper({ eagerLoading: false }).mapModelToAggregate(accessToken.refreshToken) : undefined,
            
            this.options.eagerLoading ? new ClientMapper({ eagerLoading: false }).mapModelToAggregate(accessToken.client) : undefined,
            
            
            
        );
    }

    private makeResponse(accessToken: OAuthAccessToken): AccessTokenResponse
    {
        if (!accessToken) return;
        
        return new AccessTokenResponse(
            accessToken.id.value,
            accessToken.clientId.value,
            accessToken.accountId.value,
            accessToken.token.value,
            accessToken.name.value,
            accessToken.isRevoked.value,
            accessToken.expiresAt.value,
            accessToken.createdAt.value,
            accessToken.updatedAt.value,
            accessToken.deletedAt.value,
            
            
            this.options.eagerLoading ? new RefreshTokenMapper({ eagerLoading: false }).mapAggregateToResponse(accessToken.refreshToken) : undefined,
            
            this.options.eagerLoading ? new ClientMapper({ eagerLoading: false }).mapAggregateToResponse(accessToken.client) : undefined,
            
            
            
        );
    }
}