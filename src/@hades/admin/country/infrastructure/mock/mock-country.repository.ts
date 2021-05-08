import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { ICountryRepository } from '@hades/admin/country/domain/country.repository';
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
} from '@hades/admin/country/domain/value-objects';
import { AdminCountry } from './../../domain/country.aggregate';
import { countries } from './../seeds/country.seed';

@Injectable()
export class MockCountryRepository extends MockRepository<AdminCountry> implements ICountryRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AdminCountry';
    public collectionSource: AdminCountry[];
    public deletedAtInstance: CountryDeletedAt = new CountryDeletedAt(null);

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

        for (const itemCollection of <any[]>countries)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AdminCountry.register(
                    new CountryId(itemCollection.id),
                    new CountryIso3166Alpha2(itemCollection.iso3166Alpha2),
                    new CountryIso3166Alpha3(itemCollection.iso3166Alpha3),
                    new CountryIso3166Numeric(itemCollection.iso3166Numeric),
                    new CountryCustomCode(itemCollection.customCode),
                    new CountryPrefix(itemCollection.prefix),
                    new CountryName(itemCollection.name),
                    new CountrySlug(itemCollection.slug),
                    new CountryImage(itemCollection.image),
                    new CountrySort(itemCollection.sort),
                    new CountryAdministrativeAreaLevel1(itemCollection.administrativeAreaLevel1),
                    new CountryAdministrativeAreaLevel2(itemCollection.administrativeAreaLevel2),
                    new CountryAdministrativeAreaLevel3(itemCollection.administrativeAreaLevel3),
                    new CountryAdministrativeAreas(itemCollection.administrativeAreas),
                    new CountryLatitude(itemCollection.latitude),
                    new CountryLongitude(itemCollection.longitude),
                    new CountryZoom(itemCollection.zoom),
                    new CountryDataLang(itemCollection.dataLang),
                    new CountryCreatedAt(itemCollection.createdAt),
                    new CountryUpdatedAt(itemCollection.updatedAt),
                    new CountryDeletedAt(itemCollection.deletedAt),
                ));
        }
    }
}