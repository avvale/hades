import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
import {
    AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel1CountryId,
    AdministrativeAreaLevel1Code,
    AdministrativeAreaLevel1CustomCode,
    AdministrativeAreaLevel1Name,
    AdministrativeAreaLevel1Slug,
    AdministrativeAreaLevel1Latitude,
    AdministrativeAreaLevel1Longitude,
    AdministrativeAreaLevel1Zoom,
    AdministrativeAreaLevel1CreatedAt,
    AdministrativeAreaLevel1UpdatedAt,
    AdministrativeAreaLevel1DeletedAt,
} from './../../domain/value-objects';
import { AdminAdministrativeAreaLevel1 } from './../../domain/administrative-area-level-1.aggregate';
import { administrativeAreasLevel1 } from './../seeds/administrative-area-level-1.seed';

@Injectable()
export class MockAdministrativeAreaLevel1Seeder extends MockSeeder<AdminAdministrativeAreaLevel1>
{
    public collectionSource: AdminAdministrativeAreaLevel1[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let administrativeAreaLevel1 of administrativeAreasLevel1)
        {
            this.collectionSource.push(
                AdminAdministrativeAreaLevel1.register(
                    new AdministrativeAreaLevel1Id(administrativeAreaLevel1.id),
                    new AdministrativeAreaLevel1CountryId(administrativeAreaLevel1.countryId),
                    new AdministrativeAreaLevel1Code(administrativeAreaLevel1.code),
                    new AdministrativeAreaLevel1CustomCode(administrativeAreaLevel1.customCode),
                    new AdministrativeAreaLevel1Name(administrativeAreaLevel1.name),
                    new AdministrativeAreaLevel1Slug(administrativeAreaLevel1.slug),
                    new AdministrativeAreaLevel1Latitude(administrativeAreaLevel1.latitude),
                    new AdministrativeAreaLevel1Longitude(administrativeAreaLevel1.longitude),
                    new AdministrativeAreaLevel1Zoom(administrativeAreaLevel1.zoom),
                    new AdministrativeAreaLevel1CreatedAt({currentTimestamp: true}),
                    new AdministrativeAreaLevel1UpdatedAt({currentTimestamp: true}),
                    new AdministrativeAreaLevel1DeletedAt(null),
                )
            );
        }
    }
}