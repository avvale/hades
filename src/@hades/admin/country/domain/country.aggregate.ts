import { AggregateRoot } from '@nestjs/cqrs';
import {
    CountryId,
    CountryIso3166Alpha2,
    CountryIso3166Alpha3,
    CountryIso3166Numeric,
    CountryCustomCode,
    CountryPrefix,
    CountryImage,
    CountrySort,
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

    // eager relationship

    constructor(
        id: CountryId,
        iso3166Alpha2: CountryIso3166Alpha2,
        iso3166Alpha3: CountryIso3166Alpha3,
        iso3166Numeric: CountryIso3166Numeric,
        customCode: CountryCustomCode,
        prefix: CountryPrefix,
        image: CountryImage,
        sort: CountrySort,
        administrativeAreas: CountryAdministrativeAreas,
        latitude: CountryLatitude,
        longitude: CountryLongitude,
        zoom: CountryZoom,
        dataLang: CountryDataLang,
        createdAt: CountryCreatedAt,
        updatedAt: CountryUpdatedAt,
        deletedAt: CountryDeletedAt,
    )
    {
        super();

        this.id = id;
        this.iso3166Alpha2 = iso3166Alpha2;
        this.iso3166Alpha3 = iso3166Alpha3;
        this.iso3166Numeric = iso3166Numeric;
        this.customCode = customCode;
        this.prefix = prefix;
        this.image = image;
        this.sort = sort;
        this.administrativeAreas = administrativeAreas;
        this.latitude = latitude;
        this.longitude = longitude;
        this.zoom = zoom;
        this.dataLang = dataLang;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
    }

    static register (
        id: CountryId,
        iso3166Alpha2: CountryIso3166Alpha2,
        iso3166Alpha3: CountryIso3166Alpha3,
        iso3166Numeric: CountryIso3166Numeric,
        customCode: CountryCustomCode,
        prefix: CountryPrefix,
        image: CountryImage,
        sort: CountrySort,
        administrativeAreas: CountryAdministrativeAreas,
        latitude: CountryLatitude,
        longitude: CountryLongitude,
        zoom: CountryZoom,
        dataLang: CountryDataLang,
        createdAt: CountryCreatedAt,
        updatedAt: CountryUpdatedAt,
        deletedAt: CountryDeletedAt,
    ): AdminCountry
    {
        return new AdminCountry(
            id,
            iso3166Alpha2,
            iso3166Alpha3,
            iso3166Numeric,
            customCode,
            prefix,
            image,
            sort,
            administrativeAreas,
            latitude,
            longitude,
            zoom,
            dataLang,
            createdAt,
            updatedAt,
            deletedAt,
        );
    }

    created(country: AdminCountry): void
    {
        this.apply(
            new CreatedCountryEvent(
                country.id.value,
                country.iso3166Alpha2.value,
                country.iso3166Alpha3.value,
                country.iso3166Numeric.value,
                country.customCode?.value,
                country.prefix?.value,
                country.image?.value,
                country.sort?.value,
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
                country.iso3166Alpha2?.value,
                country.iso3166Alpha3?.value,
                country.iso3166Numeric?.value,
                country.customCode?.value,
                country.prefix?.value,
                country.image?.value,
                country.sort?.value,
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
                country.iso3166Alpha2.value,
                country.iso3166Alpha3.value,
                country.iso3166Numeric.value,
                country.customCode?.value,
                country.prefix?.value,
                country.image?.value,
                country.sort?.value,
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
            iso3166Alpha2: this.iso3166Alpha2.value,
            iso3166Alpha3: this.iso3166Alpha3.value,
            iso3166Numeric: this.iso3166Numeric.value,
            customCode: this.customCode?.value,
            prefix: this.prefix?.value,
            image: this.image?.value,
            sort: this.sort?.value,
            administrativeAreas: this.administrativeAreas?.value,
            latitude: this.latitude?.value,
            longitude: this.longitude?.value,
            zoom: this.zoom?.value,
            dataLang: this.dataLang?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        }
    }
}
