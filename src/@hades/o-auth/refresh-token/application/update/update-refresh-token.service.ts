import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import {
    RefreshTokenId,
    RefreshTokenAccessTokenId,
    RefreshTokenToken,
    RefreshTokenIsRevoked,
    RefreshTokenExpiresAt,
    RefreshTokenCreatedAt,
    RefreshTokenUpdatedAt,
    RefreshTokenDeletedAt,
} from './../../domain/value-objects';
import { IRefreshTokenRepository } from './../../domain/refresh-token.repository';
import { OAuthRefreshToken } from './../../domain/refresh-token.aggregate';

@Injectable()
export class UpdateRefreshTokenService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRefreshTokenRepository,
    ) {}

    public async main(
        payload: {
            id: RefreshTokenId,
            accessTokenId?: RefreshTokenAccessTokenId,
            token?: RefreshTokenToken,
            isRevoked?: RefreshTokenIsRevoked,
            expiresAt?: RefreshTokenExpiresAt,
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const refreshToken = OAuthRefreshToken.register(
            payload.id,
            payload.accessTokenId,
            payload.token,
            payload.isRevoked,
            payload.expiresAt,
            null,
            new RefreshTokenUpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update(refreshToken, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const refreshTokenRegister = this.publisher.mergeObjectContext(
            refreshToken
        );

        refreshTokenRegister.updated(refreshToken); // apply event to model events
        refreshTokenRegister.commit(); // commit all events of model
    }
}