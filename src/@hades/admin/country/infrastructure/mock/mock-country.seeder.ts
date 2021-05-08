import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
import {
    CountryId,
    CountryIso3166Alpha2,
    CountryIso3166Alpha3,
    CountryIso3166Numeric,
    CountryCustomCode,
    CountryPrefix,
    CountryName,
    CountrySlug,
    CountryImage,
    CountrySort,
    CountryAdministrativeAreaLevel1,
    CountryAdministrativeAreaLevel2,
    CountryAdministrativeAreaLevel3,
    CountryAdministrativeAreas,
    CountryLatitude,
    CountryLongitude,
    CountryZoom,
    CountryDataLang,
    CountryCreatedAt,
    CountryUpdatedAt,
    CountryDeletedAt,
} from './../../domain/value-objects';
import { AdminCountry } from './../../domain/country.aggregate';
import { countries } from './../seeds/country.seed';

@Injectable()
export class MockCountrySeeder extends MockSeeder<AdminCountry>
{
    public collectionSource: AdminCountry[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let country of countries)
        {
            this.collectionSource.push(
                AdminCountry.register(
                    new CountryId(country.id),
                    new CountryIso3166Alpha2(country.iso3166Alpha2),
                    new CountryIso3166Alpha3(country.iso3166Alpha3),
                    new CountryIso3166Numeric(country.iso3166Numeric),
                    new CountryCustomCode(country.customCode),
                    new CountryPrefix(country.prefix),
                    new CountryName(country.name),
                    new CountrySlug(country.slug),
                    new CountryImage(country.image),
                    new CountrySort(country.sort),
                    new CountryAdministrativeAreaLevel1(country.administrativeAreaLevel1),
                    new CountryAdministrativeAreaLevel2(country.administrativeAreaLevel2),
                    new CountryAdministrativeAreaLevel3(country.administrativeAreaLevel3),
                    new CountryAdministrativeAreas(country.administrativeAreas),
                    new CountryLatitude(country.latitude),
                    new CountryLongitude(country.longitude),
                    new CountryZoom(country.zoom),
                    new CountryDataLang(country.dataLang),
                    new CountryCreatedAt({currentTimestamp: true}),
                    new CountryUpdatedAt({currentTimestamp: true}),
                    new CountryDeletedAt(null),
                )
            );
        }
    }
}