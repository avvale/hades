import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
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
import { OAuthRefreshToken } from './../../domain/refresh-token.aggregate';
import { refreshTokens } from './../seeds/refresh-token.seed';

@Injectable()
export class MockRefreshTokenSeeder extends MockSeeder<OAuthRefreshToken>
{
    public collectionSource: OAuthRefreshToken[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let refreshToken of refreshTokens)
        {
            this.collectionSource.push(
                OAuthRefreshToken.register(
                    new RefreshTokenId(refreshToken.id),
                    new RefreshTokenAccessTokenId(refreshToken.accessTokenId),
                    new RefreshTokenToken(refreshToken.token),
                    new RefreshTokenIsRevoked(refreshToken.isRevoked),
                    new RefreshTokenExpiresAt(refreshToken.expiresAt),
                    new RefreshTokenCreatedAt({currentTimestamp: true}),
                    new RefreshTokenUpdatedAt({currentTimestamp: true}),
                    new RefreshTokenDeletedAt(null),
                )
            );
        }
    }
}