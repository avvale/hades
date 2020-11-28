import { AggregateRoot } from '@nestjs/cqrs';
import {
    AdministrativeAreaLevel2Id,
    AdministrativeAreaLevel2CountryCommonId,
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
} from './value-objects';
import { CreatedAdministrativeAreaLevel2Event } from './../application/events/created-administrative-area-level-2.event';
import { UpdatedAdministrativeAreaLevel2Event } from './../application/events/updated-administrative-area-level-2.event';
import { DeletedAdministrativeAreaLevel2Event } from './../application/events/deleted-administrative-area-level-2.event';
import { AdminCountry } from '@hades/admin/country/domain/country.aggregate';
import { AdminAdministrativeAreaLevel1 } from '@hades/admin/administrative-area-level-1/domain/administrative-area-level-1.aggregate';

export class AdminAdministrativeAreaLevel2 extends AggregateRoot
{
    id: AdministrativeAreaLevel2Id;
    countryCommonId: AdministrativeAreaLevel2CountryCommonId;
    administrativeAreaLevel1Id: AdministrativeAreaLevel2AdministrativeAreaLevel1Id;
    code: AdministrativeAreaLevel2Code;
    customCode: AdministrativeAreaLevel2CustomCode;
    name: AdministrativeAreaLevel2Name;
    slug: AdministrativeAreaLevel2Slug;
    latitude: AdministrativeAreaLevel2Latitude;
    longitude: AdministrativeAreaLevel2Longitude;
    zoom: AdministrativeAreaLevel2Zoom;
    createdAt: AdministrativeAreaLevel2CreatedAt;
    updatedAt: AdministrativeAreaLevel2UpdatedAt;
    deletedAt: AdministrativeAreaLevel2DeletedAt;

    // eager relationship
    country: AdminCountry;
    administrativeAreaLevel1: AdminAdministrativeAreaLevel1;

    constructor(
        id: AdministrativeAreaLevel2Id,
        countryCommonId: AdministrativeAreaLevel2CountryCommonId,
        administrativeAreaLevel1Id: AdministrativeAreaLevel2AdministrativeAreaLevel1Id,
        code: AdministrativeAreaLevel2Code,
        customCode: AdministrativeAreaLevel2CustomCode,
        name: AdministrativeAreaLevel2Name,
        slug: AdministrativeAreaLevel2Slug,
        latitude: AdministrativeAreaLevel2Latitude,
        longitude: AdministrativeAreaLevel2Longitude,
        zoom: AdministrativeAreaLevel2Zoom,
        createdAt: AdministrativeAreaLevel2CreatedAt,
        updatedAt: AdministrativeAreaLevel2UpdatedAt,
        deletedAt: AdministrativeAreaLevel2DeletedAt,
        country?: AdminCountry,
        administrativeAreaLevel1?: AdminAdministrativeAreaLevel1,
    )
    {
        super();

        this.id = id;
        this.countryCommonId = countryCommonId;
        this.administrativeAreaLevel1Id = administrativeAreaLevel1Id;
        this.code = code;
        this.customCode = customCode;
        this.name = name;
        this.slug = slug;
        this.latitude = latitude;
        this.longitude = longitude;
        this.zoom = zoom;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.country = country;
        this.administrativeAreaLevel1 = administrativeAreaLevel1;
    }

    static register (
        id: AdministrativeAreaLevel2Id,
        countryCommonId: AdministrativeAreaLevel2CountryCommonId,
        administrativeAreaLevel1Id: AdministrativeAreaLevel2AdministrativeAreaLevel1Id,
        code: AdministrativeAreaLevel2Code,
        customCode: AdministrativeAreaLevel2CustomCode,
        name: AdministrativeAreaLevel2Name,
        slug: AdministrativeAreaLevel2Slug,
        latitude: AdministrativeAreaLevel2Latitude,
        longitude: AdministrativeAreaLevel2Longitude,
        zoom: AdministrativeAreaLevel2Zoom,
        createdAt: AdministrativeAreaLevel2CreatedAt,
        updatedAt: AdministrativeAreaLevel2UpdatedAt,
        deletedAt: AdministrativeAreaLevel2DeletedAt,
        country?: AdminCountry,
        administrativeAreaLevel1?: AdminAdministrativeAreaLevel1,
    ): AdminAdministrativeAreaLevel2
    {
        return new AdminAdministrativeAreaLevel2(
            id,
            countryCommonId,
            administrativeAreaLevel1Id,
            code,
            customCode,
            name,
            slug,
            latitude,
            longitude,
            zoom,
            createdAt,
            updatedAt,
            deletedAt,
            country,
            administrativeAreaLevel1,
        );
    }

    created(administrativeAreaLevel2: AdminAdministrativeAreaLevel2): void
    {
        this.apply(
            new CreatedAdministrativeAreaLevel2Event(
                administrativeAreaLevel2.id.value,
                administrativeAreaLevel2.countryCommonId.value,
                administrativeAreaLevel2.administrativeAreaLevel1Id.value,
                administrativeAreaLevel2.code.value,
                administrativeAreaLevel2.customCode?.value,
                administrativeAreaLevel2.name.value,
                administrativeAreaLevel2.slug.value,
                administrativeAreaLevel2.latitude?.value,
                administrativeAreaLevel2.longitude?.value,
                administrativeAreaLevel2.zoom?.value,
                administrativeAreaLevel2.createdAt?.value,
                administrativeAreaLevel2.updatedAt?.value,
                administrativeAreaLevel2.deletedAt?.value,
            )
        );
    }

    updated(administrativeAreaLevel2: AdminAdministrativeAreaLevel2): void
    {
        this.apply(
            new UpdatedAdministrativeAreaLevel2Event(
                administrativeAreaLevel2.id.value,
                administrativeAreaLevel2.countryCommonId?.value,
                administrativeAreaLevel2.administrativeAreaLevel1Id?.value,
                administrativeAreaLevel2.code?.value,
                administrativeAreaLevel2.customCode?.value,
                administrativeAreaLevel2.name?.value,
                administrativeAreaLevel2.slug?.value,
                administrativeAreaLevel2.latitude?.value,
                administrativeAreaLevel2.longitude?.value,
                administrativeAreaLevel2.zoom?.value,
                administrativeAreaLevel2.createdAt?.value,
                administrativeAreaLevel2.updatedAt?.value,
                administrativeAreaLevel2.deletedAt?.value,
            )
        );
    }

    deleted(administrativeAreaLevel2: AdminAdministrativeAreaLevel2): void
    {
        this.apply(
            new DeletedAdministrativeAreaLevel2Event(
                administrativeAreaLevel2.id.value,
                administrativeAreaLevel2.countryCommonId.value,
                administrativeAreaLevel2.administrativeAreaLevel1Id.value,
                administrativeAreaLevel2.code.value,
                administrativeAreaLevel2.customCode?.value,
                administrativeAreaLevel2.name.value,
                administrativeAreaLevel2.slug.value,
                administrativeAreaLevel2.latitude?.value,
                administrativeAreaLevel2.longitude?.value,
                administrativeAreaLevel2.zoom?.value,
                administrativeAreaLevel2.createdAt?.value,
                administrativeAreaLevel2.updatedAt?.value,
                administrativeAreaLevel2.deletedAt?.value,
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            countryCommonId: this.countryCommonId.value,
            administrativeAreaLevel1Id: this.administrativeAreaLevel1Id.value,
            code: this.code.value,
            customCode: this.customCode?.value,
            name: this.name.value,
            slug: this.slug.value,
            latitude: this.latitude?.value,
            longitude: this.longitude?.value,
            zoom: this.zoom?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            country: this.country?.toDTO(),
            administrativeAreaLevel1: this.administrativeAreaLevel1?.toDTO(),
        }
    }
}
