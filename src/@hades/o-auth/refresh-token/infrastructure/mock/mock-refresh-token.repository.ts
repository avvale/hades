import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IRefreshTokenRepository } from '@hades/o-auth/refresh-token/domain/refresh-token.repository';
import { 
    RefreshTokenId,
    RefreshTokenAccessTokenId,
    RefreshTokenToken,
    RefreshTokenIsRevoked,
    RefreshTokenExpiresAt,
    RefreshTokenCreatedAt,
    RefreshTokenUpdatedAt,
    RefreshTokenDeletedAt
    
} from '@hades/o-auth/refresh-token/domain/value-objects';
import { OAuthRefreshToken } from './../../domain/refresh-token.aggregate';
import { refreshTokens } from './../seeds/refresh-token.seed';

@Injectable()
export class MockRefreshTokenRepository extends MockRepository<OAuthRefreshToken> implements IRefreshTokenRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthRefreshToken';
    public collectionSource: OAuthRefreshToken[];
    public deletedAtInstance: RefreshTokenDeletedAt = new RefreshTokenDeletedAt(null);
    
    constructor() 
    {
        super();
        this.createSourceMockData();
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>refreshTokens)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(OAuthRefreshToken.register(
                    new RefreshTokenId(itemCollection.id),
                    new RefreshTokenAccessTokenId(itemCollection.accessTokenId),
                    new RefreshTokenToken(itemCollection.token),
                    new RefreshTokenIsRevoked(itemCollection.isRevoked),
                    new RefreshTokenExpiresAt(itemCollection.expiresAt),
                    new RefreshTokenCreatedAt(itemCollection.createdAt),
                    new RefreshTokenUpdatedAt(itemCollection.updatedAt),
                    new RefreshTokenDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }
}