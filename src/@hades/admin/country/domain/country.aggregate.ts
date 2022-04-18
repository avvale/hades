// ignored file
import { AggregateRoot } from '@nestjs/cqrs';
import {
    CountryId,
    CountryI18nLangId,
    CountryIso3166Alpha2,
    CountryIso3166Alpha3,
    CountryIso3166Numeric,
    CountryCustomCode,
    CountryPrefix,
    CountryI18nName,
    CountryI18nSlug,
    CountryImage,
    CountrySort,
    CountryI18nAdministrativeAreaLevel1,
    CountryI18nAdministrativeAreaLevel2,
    CountryI18nAdministrativeAreaLevel3,
    CountryAdministrativeAreas,
    CountryLatitude,
    CountryLongitude,
    CountryZoom,
    CountryDataLang,
    CountryCreatedAt,
    CountryUpdatedAt,
    CountryDeletedAt,
} from './value-objects';
import { CreatedCountryEvent } from './../application/events/created-country.event';
import { UpdatedCountryEvent } from './../application/events/updated-country.event';
import { DeletedCountryEvent } from './../application/events/deleted-country.event';
import { AdminLang } from '@hades/admin/lang/domain/lang.aggregate';
import { Utils } from '@hades/shared/domain/lib/utils';

export class AdminCountry extends AggregateRoot
{
    id: CountryId;
    iso3166Alpha2: CountryIso3166Alpha2;
    iso3166Alpha3: CountryIso3166Alpha3;
    iso3166Numeric: CountryIso3166Numeric;
    customCode: CountryCustomCode;
    prefix: CountryPrefix;
    image: CountryImage;
    sort: CountrySort;
    administrativeAreas: CountryAdministrativeAreas;
    latitude: CountryLatitude;
    longitude: CountryLongitude;
    zoom: CountryZoom;
    dataLang: CountryDataLang;
    createdAt: CountryCreatedAt;
    updatedAt: CountryUpdatedAt;
    deletedAt: CountryDeletedAt;

    // i18n
    langId: CountryI18nLangId;
    name: CountryI18nName;
    slug: CountryI18nSlug;
    administrativeAreaLevel1: CountryI18nAdministrativeAreaLevel1;
    administrativeAreaLevel2: CountryI18nAdministrativeAreaLevel2;
    administrativeAreaLevel3: CountryI18nAdministrativeAreaLevel3;

    // eager relationship
    lang: AdminLang;

    constructor(
        id: CountryId,
        langId: CountryI18nLangId,
        iso3166Alpha2: CountryIso3166Alpha2,
        iso3166Alpha3: CountryIso3166Alpha3,
        iso3166Numeric: CountryIso3166Numeric,
        customCode: CountryCustomCode,
        prefix: CountryPrefix,
        name: CountryI18nName,
        slug: CountryI18nSlug,
        image: CountryImage,
        sort: CountrySort,
        administrativeAreaLevel1: CountryI18nAdministrativeAreaLevel1,
        administrativeAreaLevel2: CountryI18nAdministrativeAreaLevel2,
        administrativeAreaLevel3: CountryI18nAdministrativeAreaLevel3,
        administrativeAreas: CountryAdministrativeAreas,
        latitude: CountryLatitude,
        longitude: CountryLongitude,
        zoom: CountryZoom,
        dataLang: CountryDataLang,
        createdAt: CountryCreatedAt,
        updatedAt: CountryUpdatedAt,
        deletedAt: CountryDeletedAt,
        lang?: AdminLang,
    )
    {
        super();

        this.id = id;
        this.langId = langId;
        this.iso3166Alpha2 = iso3166Alpha2;
        this.iso3166Alpha3 = iso3166Alpha3;
        this.iso3166Numeric = iso3166Numeric;
        this.customCode = customCode;
        this.prefix = prefix;
        this.name = name;
        this.slug = slug;
        this.image = image;
        this.sort = sort;
        this.administrativeAreaLevel1 = administrativeAreaLevel1;
        this.administrativeAreaLevel2 = administrativeAreaLevel2;
        this.administrativeAreaLevel3 = administrativeAreaLevel3;
        this.administrativeAreas = administrativeAreas;
        this.latitude = latitude;
        this.longitude = longitude;
        this.zoom = zoom;
        this.dataLang = dataLang;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.lang = lang;
    }

    static register (
        id: CountryId,
        langId: CountryI18nLangId,
        iso3166Alpha2: CountryIso3166Alpha2,
        iso3166Alpha3: CountryIso3166Alpha3,
        iso3166Numeric: CountryIso3166Numeric,
        customCode: CountryCustomCode,
        prefix: CountryPrefix,
        name: CountryI18nName,
        slug: CountryI18nSlug,
        image: CountryImage,
        sort: CountrySort,
        administrativeAreaLevel1: CountryI18nAdministrativeAreaLevel1,
        administrativeAreaLevel2: CountryI18nAdministrativeAreaLevel2,
        administrativeAreaLevel3: CountryI18nAdministrativeAreaLevel3,
        administrativeAreas: CountryAdministrativeAreas,
        latitude: CountryLatitude,
        longitude: CountryLongitude,
        zoom: CountryZoom,
        dataLang: CountryDataLang,
        createdAt: CountryCreatedAt,
        updatedAt: CountryUpdatedAt,
        deletedAt: CountryDeletedAt,
        lang?: AdminLang,
    ): AdminCountry
    {
        return new AdminCountry(
            id,
            langId,
            iso3166Alpha2,
            iso3166Alpha3,
            iso3166Numeric,
            customCode,
            prefix,
            name,
            slug,
            image,
            sort,
            administrativeAreaLevel1,
            administrativeAreaLevel2,
            administrativeAreaLevel3,
            administrativeAreas,
            latitude,
            longitude,
            zoom,
            dataLang,
            createdAt,
            updatedAt,
            deletedAt,
            lang,
        );
    }

    created(country: AdminCountry): void
    {
        this.apply(
            new CreatedCountryEvent(
                country.id.value,
                country.langId.value,
                country.iso3166Alpha2.value,
                country.iso3166Alpha3.value,
                country.iso3166Numeric.value,
                country.customCode?.value,
                country.prefix?.value,
                country.name.value,
                country.slug.value,
                country.image?.value,
                country.sort?.value,
                country.administrativeAreaLevel1?.value,
                country.administrativeAreaLevel2?.value,
                country.administrativeAreaLevel3?.value,
                country.administrativeAreas?.value,
                country.latitude?.value,
                country.longitude?.value,
                country.zoom?.value,
                country.dataLang?.value,
                country.createdAt?.value,
                country.updatedAt?.value,
                country.deletedAt?.value,
            )
        );
    }

    updated(country: AdminCountry): void
    {
        this.apply(
            new UpdatedCountryEvent(
                country.id.value,
                country.langId?.value,
                country.iso3166Alpha2?.value,
                country.iso3166Alpha3?.value,
                country.iso3166Numeric?.value,
                country.customCode?.value,
                country.prefix?.value,
                country.name?.value,
                country.slug?.value,
                country.image?.value,
                country.sort?.value,
                country.administrativeAreaLevel1?.value,
                country.administrativeAreaLevel2?.value,
                country.administrativeAreaLevel3?.value,
                country.administrativeAreas?.value,
                country.latitude?.value,
                country.longitude?.value,
                country.zoom?.value,
                country.dataLang?.value,
                country.createdAt?.value,
                country.updatedAt?.value,
                country.deletedAt?.value,
            )
        );
    }

    deleted(country: AdminCountry): void
    {
        this.apply(
            new DeletedCountryEvent(
                country.id.value,
                country.langId.value,
                country.iso3166Alpha2.value,
                country.iso3166Alpha3.value,
                country.iso3166Numeric.value,
                country.customCode?.value,
                country.prefix?.value,
                country.name.value,
                country.slug.value,
                country.image?.value,
                country.sort?.value,
                country.administrativeAreaLevel1?.value,
                country.administrativeAreaLevel2?.value,
                country.administrativeAreaLevel3?.value,
                country.administrativeAreas?.value,
                country.latitude?.value,
                country.longitude?.value,
                country.zoom?.value,
                country.dataLang?.value,
                country.createdAt?.value,
                country.updatedAt?.value,
                country.deletedAt?.value,
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            langId: this.langId.value,
            iso3166Alpha2: this.iso3166Alpha2.value,
            iso3166Alpha3: this.iso3166Alpha3.value,
            iso3166Numeric: this.iso3166Numeric.value,
            customCode: this.customCode?.value,
            prefix: this.prefix?.value,
            name: this.name.value,
            slug: this.slug.value,
            image: this.image?.value,
            sort: this.sort?.value,
            administrativeAreaLevel1: this.administrativeAreaLevel1?.value,
            administrativeAreaLevel2: this.administrativeAreaLevel2?.value,
            administrativeAreaLevel3: this.administrativeAreaLevel3?.value,
            administrativeAreas: this.administrativeAreas?.value,
            latitude: this.latitude?.value,
            longitude: this.longitude?.value,
            zoom: this.zoom?.value,
            dataLang: this.dataLang?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            lang: this.lang?.toDTO(),
        }
    }

    toI18nDTO(): Object
    {
        return {
            id: Utils.uuid(),
            countryId: this.id.value,
            langId: this.langId.value,
            name: this.name.value,
            slug: this.slug.value,
            administrativeAreaLevel1: this.administrativeAreaLevel1?.value,
            administrativeAreaLevel2: this.administrativeAreaLevel2?.value,
            administrativeAreaLevel3: this.administrativeAreaLevel3?.value,
            administrativeAreas: this.administrativeAreas?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        }
    }
}
