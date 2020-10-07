import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    AccessTokenId,
    AccessTokenClientId,
    AccessTokenAccountId,
    AccessTokenName,
    AccessTokenCreatedAt,
    AccessTokenUpdatedAt,
    AccessTokenExpiredAccessToken,
    AccessTokenToken, 
    AccessTokenIsRevoked, 
    AccessTokenExpiresAt
    
} from './../../domain/value-objects';
import { IAccessTokenRepository } from './../../domain/access-token.repository';
import { OAuthAccessToken } from './../../domain/access-token.aggregate';
import { Jwt } from '@hades/shared/domain/lib/hades.types';
declare const Buffer: any;

@Injectable()
export class CreateAccessTokenService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAccessTokenRepository,
        private readonly jwtService: JwtService
    ) {}

    public async main(
        id: AccessTokenId,
        clientId: AccessTokenClientId,
        accountId: AccessTokenAccountId,
        name: AccessTokenName,
        expiredAccessToken: AccessTokenExpiredAccessToken
        
    ): Promise<void>
    {
        // compose access token
        const momentExpiredAccessToken = expiredAccessToken.value ? Utils.now().add(expiredAccessToken.value, 'seconds') : null
        const accessTokenPayload: Jwt = {
            jit: id.value,
            aci: accountId.value,
            iss: 'Hades OAuth',
            iat: parseInt(Utils.now().format('X')),
            nbf: parseInt(Utils.now().format('X')),
            exp: momentExpiredAccessToken ? parseInt(momentExpiredAccessToken.format('X')) : null
        };
        
        const accessTokenValueObject = new AccessTokenToken(this.jwtService.sign(accessTokenPayload));

        // create aggregate with factory pattern
        const accessToken = OAuthAccessToken.register(
            id,
            clientId,
            accountId,
            accessTokenValueObject,
            name,
            new AccessTokenIsRevoked(false),
            new AccessTokenExpiresAt(momentExpiredAccessToken ? momentExpiredAccessToken.format('YYYY-MM-DD H:mm:ss') : null),
            new AccessTokenCreatedAt(Utils.nowTimestamp()),
            new AccessTokenUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // create
        await this.repository.create(accessToken);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const accessTokenRegister = this.publisher.mergeObjectContext(
            accessToken
        );
        
        accessTokenRegister.created(accessToken); // apply event to model events
        accessTokenRegister.commit(); // commit all events of model
    }
}