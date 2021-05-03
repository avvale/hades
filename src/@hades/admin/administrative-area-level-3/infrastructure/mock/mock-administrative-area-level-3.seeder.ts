import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
import {
    AdministrativeAreaLevel3Id,
    AdministrativeAreaLevel3CountryId,
    AdministrativeAreaLevel3AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel3AdministrativeAreaLevel2Id,
    AdministrativeAreaLevel3Code,
    AdministrativeAreaLevel3CustomCode,
    AdministrativeAreaLevel3Name,
    AdministrativeAreaLevel3Slug,
    AdministrativeAreaLevel3Latitude,
    AdministrativeAreaLevel3Longitude,
    AdministrativeAreaLevel3Zoom,
    AdministrativeAreaLevel3CreatedAt,
    AdministrativeAreaLevel3UpdatedAt,
    AdministrativeAreaLevel3DeletedAt,
} from './../../domain/value-objects';
import { AdminAdministrativeAreaLevel3 } from './../../domain/administrative-area-level-3.aggregate';
import { administrativeAreasLevel3 } from './../seeds/administrative-area-level-3.seed';

@Injectable()
export class MockAdministrativeAreaLevel3Seeder extends MockSeeder<AdminAdministrativeAreaLevel3>
{
    public collectionSource: AdminAdministrativeAreaLevel3[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let administrativeAreaLevel3 of administrativeAreasLevel3)
        {
            this.collectionSource.push(
                AdminAdministrativeAreaLevel3.register(
                    new AdministrativeAreaLevel3Id(administrativeAreaLevel3.id),
                    new AdministrativeAreaLevel3CountryId(administrativeAreaLevel3.countryId),
                    new AdministrativeAreaLevel3AdministrativeAreaLevel1Id(administrativeAreaLevel3.administrativeAreaLevel1Id),
                    new AdministrativeAreaLevel3AdministrativeAreaLevel2Id(administrativeAreaLevel3.administrativeAreaLevel2Id),
                    new AdministrativeAreaLevel3Code(administrativeAreaLevel3.code),
                    new AdministrativeAreaLevel3CustomCode(administrativeAreaLevel3.customCode),
                    new AdministrativeAreaLevel3Name(administrativeAreaLevel3.name),
                    new AdministrativeAreaLevel3Slug(administrativeAreaLevel3.slug),
                    new AdministrativeAreaLevel3Latitude(administrativeAreaLevel3.latitude),
                    new AdministrativeAreaLevel3Longitude(administrativeAreaLevel3.longitude),
                    new AdministrativeAreaLevel3Zoom(administrativeAreaLevel3.zoom),
                    new AdministrativeAreaLevel3CreatedAt({currentTimestamp: true}),
                    new AdministrativeAreaLevel3UpdatedAt({currentTimestamp: true}),
                    new AdministrativeAreaLevel3DeletedAt(null),
                )
            );
        }
    }
}