import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
import {
    ClientId,
    ClientGrantType,
    ClientName,
    ClientSecret,
    ClientAuthUrl,
    ClientRedirect,
    ClientExpiredAccessToken,
    ClientExpiredRefreshToken,
    ClientIsActive,
    ClientIsMaster,
    ClientApplicationIds,
    ClientCreatedAt,
    ClientUpdatedAt,
    ClientDeletedAt,
} from './../../domain/value-objects';
import { OAuthClient } from './../../domain/client.aggregate';
import { clients } from './../seeds/client.seed';

@Injectable()
export class MockClientSeeder extends MockSeeder<OAuthClient>
{
    public collectionSource: OAuthClient[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let client of clients)
        {
            this.collectionSource.push(
                OAuthClient.register(
                    new ClientId(client.id),
                    new ClientGrantType(client.grantType),
                    new ClientName(client.name),
                    new ClientSecret(client.secret),
                    new ClientAuthUrl(client.authUrl),
                    new ClientRedirect(client.redirect),
                    new ClientExpiredAccessToken(client.expiredAccessToken),
                    new ClientExpiredRefreshToken(client.expiredRefreshToken),
                    new ClientIsActive(client.isActive),
                    new ClientIsMaster(client.isMaster),
                    new ClientApplicationIds(client.applicationIds),
                    new ClientCreatedAt({currentTimestamp: true}),
                    new ClientUpdatedAt({currentTimestamp: true}),
                    new ClientDeletedAt(null),
                )
            );
        }
    }
}