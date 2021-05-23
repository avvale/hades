import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
import {
    AdministrativeAreaLevel2Id,
    AdministrativeAreaLevel2CountryId,
    AdministrativeAreaLevel2AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel2Code,
    AdministrativeAreaLevel2CustomCode,
    AdministrativeAreaLevel2Name,
    AdministrativeAreaLevel2Slug,
    AdministrativeAreaLevel2Latitude,
    AdministrativeAreaLevel2Longitude,
    AdministrativeAreaLevel2Zoom,
    AdministrativeAreaLevel2CreatedAt,
    AdministrativeAreaLevel2UpdatedAt,
    AdministrativeAreaLevel2DeletedAt,
} from './../../domain/value-objects';
import { AdminAdministrativeAreaLevel2 } from './../../domain/administrative-area-level-2.aggregate';
import { administrativeAreasLevel2 } from './../seeds/administrative-area-level-2.seed';

@Injectable()
export class MockAdministrativeAreaLevel2Seeder extends MockSeeder<AdminAdministrativeAreaLevel2>
{
    public collectionSource: AdminAdministrativeAreaLevel2[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let administrativeAreaLevel2 of administrativeAreasLevel2)
        {
            this.collectionSource.push(
                AdminAdministrativeAreaLevel2.register(
                    new AdministrativeAreaLevel2Id(administrativeAreaLevel2.id),
                    new AdministrativeAreaLevel2CountryId(administrativeAreaLevel2.countryId),
                    new AdministrativeAreaLevel2AdministrativeAreaLevel1Id(administrativeAreaLevel2.administrativeAreaLevel1Id),
                    new AdministrativeAreaLevel2Code(administrativeAreaLevel2.code),
                    new AdministrativeAreaLevel2CustomCode(administrativeAreaLevel2.customCode),
                    new AdministrativeAreaLevel2Name(administrativeAreaLevel2.name),
                    new AdministrativeAreaLevel2Slug(administrativeAreaLevel2.slug),
                    new AdministrativeAreaLevel2Latitude(administrativeAreaLevel2.latitude),
                    new AdministrativeAreaLevel2Longitude(administrativeAreaLevel2.longitude),
                    new AdministrativeAreaLevel2Zoom(administrativeAreaLevel2.zoom),
                    new AdministrativeAreaLevel2CreatedAt({currentTimestamp: true}),
                    new AdministrativeAreaLevel2UpdatedAt({currentTimestamp: true}),
                    new AdministrativeAreaLevel2DeletedAt(null),
                )
            );
        }
    }
}