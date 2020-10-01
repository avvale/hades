import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
    
} from './../../domain/value-objects';
import { IAccessTokenRepository } from './../../domain/access-token.repository';
import { OAuthAccessToken } from './../../domain/access-token.aggregate';

@Injectable()
export class UpdateAccessTokenService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAccessTokenRepository
    ) {}

    public async main(
        id: AccessTokenId,
        clientId?: AccessTokenClientId,
        accountId?: AccessTokenAccountId,
        token?: AccessTokenToken,
        name?: AccessTokenName,
        isRevoked?: AccessTokenIsRevoked,
        expiresAt?: AccessTokenExpiresAt,
        
    ): Promise<void>
    {        
        // create aggregate with factory pattern
        const accessToken = OAuthAccessToken.register(
            id,
            clientId,
            accountId,
            token,
            name,
            isRevoked,
            expiresAt,
            null,
            new AccessTokenUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(accessToken);        
            
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const accessTokenRegister = this.publisher.mergeObjectContext(
            accessToken
        );
        
        accessTokenRegister.updated(accessToken); // apply event to model events
        accessTokenRegister.commit(); // commit all events of model
    }
}