import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IClientRepository } from '@hades/o-auth/client/domain/client.repository';
import { 
    ClientId,
    ClientGrantType,
    ClientName,
    ClientSecret,
    ClientAuthUrl,
    ClientRedirect,
    ClientApplicationCodes,
    ClientExpiredAccessToken,
    ClientExpiredRefreshToken,
    ClientIsRevoked,
    ClientIsMaster,
    ClientApplicationIds,
    ClientCreatedAt,
    ClientUpdatedAt,
    ClientDeletedAt
    
} from '@hades/o-auth/client/domain/value-objects';
import { OAuthClient } from './../../domain/client.aggregate';
import { clients } from './../seeds/client.seed';

@Injectable()
export class MockClientRepository extends MockRepository<OAuthClient> implements IClientRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthClient';
    public collectionSource: OAuthClient[];
    public deletedAtInstance: ClientDeletedAt = new ClientDeletedAt(null);
    
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

        for (const itemCollection of <any[]>clients)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(OAuthClient.register(
                    new ClientId(itemCollection.id),
                    new ClientGrantType(itemCollection.grantType),
                    new ClientName(itemCollection.name),
                    new ClientSecret(itemCollection.secret),
                    new ClientAuthUrl(itemCollection.authUrl),
                    new ClientRedirect(itemCollection.redirect),
                    new ClientApplicationCodes(itemCollection.applicationCodes),
                    new ClientExpiredAccessToken(itemCollection.expiredAccessToken),
                    new ClientExpiredRefreshToken(itemCollection.expiredRefreshToken),
                    new ClientIsRevoked(itemCollection.isRevoked),
                    new ClientIsMaster(itemCollection.isMaster),
                    new ClientApplicationIds(itemCollection.applicationIds),
                    new ClientCreatedAt(itemCollection.createdAt),
                    new ClientUpdatedAt(itemCollection.updatedAt),
                    new ClientDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }
}