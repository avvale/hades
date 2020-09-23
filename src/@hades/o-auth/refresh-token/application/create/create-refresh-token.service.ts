import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    RefreshTokenId,
    RefreshTokenAccessTokenId,
    RefreshTokenToken,
    RefreshTokenIsRevoked,
    RefreshTokenExpiresAt,
    RefreshTokenCreatedAt,
    RefreshTokenUpdatedAt,
    RefreshTokenDeletedAt
    
} from './../../domain/value-objects';
import { IRefreshTokenRepository } from './../../domain/refresh-token.repository';
import { OAuthRefreshToken } from './../../domain/refresh-token.aggregate';

@Injectable()
export class CreateRefreshTokenService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRefreshTokenRepository
    ) {}

    public async main(
        id: RefreshTokenId,
        accessTokenId: RefreshTokenAccessTokenId,
        token: RefreshTokenToken,
        isRevoked: RefreshTokenIsRevoked,
        expiresAt: RefreshTokenExpiresAt,
        
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const refreshToken = OAuthRefreshToken.register(
            id,
            accessTokenId,
            token,
            isRevoked,
            expiresAt,
            new RefreshTokenCreatedAt(Utils.nowTimestamp()),
            new RefreshTokenUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // create
        await this.repository.create(refreshToken);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const refreshTokenRegister = this.publisher.mergeObjectContext(
            refreshToken
        );
        
        refreshTokenRegister.created(refreshToken); // apply event to model events
        refreshTokenRegister.commit(); // commit all events of model
    }
}