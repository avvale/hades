import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral } from '@hades/shared/domain/lib/hades.types';
import { OAuthCredential } from './credential.aggregate';
import { CredentialResponse } from './credential.response';
import { 
    CredentialGrantType,
    CredentialUsername,
    CredentialPassword,
    CredentialAccessTokenId,
    CredentialRefreshToken,
    CredentialClientSecret,
    CredentialRedirect
    
} from './value-objects';

export class CredentialMapper //implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true }
    ) {}
    
    /**
     * Map object to aggregate
     * @param credential
     */
    mapModelToAggregate(credential: ObjectLiteral): OAuthCredential
    {
        /* if (!credential) return;

        return this.makeAggregate(credential); */
        return;
    }

    /**
     * Map array of objects to array aggregates
     * @param credentials 
     */
    mapModelsToAggregates(credentials: ObjectLiteral[]): OAuthCredential[]
    {
        /* if (!Array.isArray(credentials)) return;
        
        return credentials.map(credential  => this.makeAggregate(credential)); */
        return;
    }

    /**
     * Map aggregate to response
     * @param credential 
     */
    mapAggregateToResponse(credential: OAuthCredential): CredentialResponse
    {
        // return this.makeResponse(credential);
        return;
    }

    /**
     * Map array of aggregates to array responses
     * @param credentials
     */
    mapAggregatesToResponses(credentials: OAuthCredential[]): CredentialResponse
    {
        /* if (!Array.isArray(credentials)) return;

        return credentials.map(credential => this.makeResponse(credential)); */
        return;
    }

    private makeAggregate(credential: ObjectLiteral): OAuthCredential
    {
        return OAuthCredential.register(
            new CredentialGrantType(credential.grantType),
            new CredentialUsername(credential.username),
            new CredentialPassword(credential.password),
            new CredentialAccessTokenId(credential.accessTokenId),
            new CredentialRefreshToken(credential.refreshToken),
            new CredentialClientSecret(credential.clientSecret),
            new CredentialRedirect(credential.redirect)
        );
    }

    private makeResponse(credential: OAuthCredential): CredentialResponse
    {
        if (!credential) return;
        
        return new CredentialResponse(
            credential.grantType.value,
            credential.username.value,
            credential.password.value,
            credential.accessTokenId.value,
            credential.refreshToken.value,
            credential.clientSecret.value,
            credential.redirect.value,
        );
    }
}