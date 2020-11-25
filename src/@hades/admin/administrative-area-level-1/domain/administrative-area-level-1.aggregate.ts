import { AggregateRoot } from '@nestjs/cqrs';
import {
    AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel1CountryCommonId,
    AdministrativeAreaLevel1Code,
    AdministrativeAreaLevel1CustomCode,
    AdministrativeAreaLevel1Name,
    AdministrativeAreaLevel1Slug,
    AdministrativeAreaLevel1CreatedAt,
    AdministrativeAreaLevel1UpdatedAt,
    AdministrativeAreaLevel1DeletedAt,
} from './value-objects';
import { CreatedAdministrativeAreaLevel1Event } from './../application/events/created-administrative-area-level-1.event';
import { UpdatedAdministrativeAreaLevel1Event } from './../application/events/updated-administrative-area-level-1.event';
import { DeletedAdministrativeAreaLevel1Event } from './../application/events/deleted-administrative-area-level-1.event';
import { AdminCountry } from '@hades/admin/country/domain/country.aggregate';

export class AdminAdministrativeAreaLevel1 extends AggregateRoot
{
    id: AdministrativeAreaLevel1Id;
    countryCommonId: AdministrativeAreaLevel1CountryCommonId;
    code: AdministrativeAreaLevel1Code;
    customCode: AdministrativeAreaLevel1CustomCode;
    name: AdministrativeAreaLevel1Name;
    slug: AdministrativeAreaLevel1Slug;
    createdAt: AdministrativeAreaLevel1CreatedAt;
    updatedAt: AdministrativeAreaLevel1UpdatedAt;
    deletedAt: AdministrativeAreaLevel1DeletedAt;

    // eager relationship
    country: AdminCountry;

    constructor(
        id: AdministrativeAreaLevel1Id,
        countryCommonId: AdministrativeAreaLevel1CountryCommonId,
        code: AdministrativeAreaLevel1Code,
        customCode: AdministrativeAreaLevel1CustomCode,
        name: AdministrativeAreaLevel1Name,
        slug: AdministrativeAreaLevel1Slug,
        createdAt: AdministrativeAreaLevel1CreatedAt,
        updatedAt: AdministrativeAreaLevel1UpdatedAt,
        deletedAt: AdministrativeAreaLevel1DeletedAt,
        country?: AdminCountry,
    )
    {
        super();

        this.id = id;
        this.countryCommonId = countryCommonId;
        this.code = code;
        this.customCode = customCode;
        this.name = name;
        this.slug = slug;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.country = country;
    }

    static register (
        id: AdministrativeAreaLevel1Id,
        countryCommonId: AdministrativeAreaLevel1CountryCommonId,
        code: AdministrativeAreaLevel1Code,
        customCode: AdministrativeAreaLevel1CustomCode,
        name: AdministrativeAreaLevel1Name,
        slug: AdministrativeAreaLevel1Slug,
        createdAt: AdministrativeAreaLevel1CreatedAt,
        updatedAt: AdministrativeAreaLevel1UpdatedAt,
        deletedAt: AdministrativeAreaLevel1DeletedAt,
        country?: AdminCountry,
    ): AdminAdministrativeAreaLevel1
    {
        return new AdminAdministrativeAreaLevel1(
            id,
            countryCommonId,
            code,
            customCode,
            name,
            slug,
            createdAt,
            updatedAt,
            deletedAt,
            country,
        );
    }

    created(administrativeAreaLevel1: AdminAdministrativeAreaLevel1): void
    {
        this.apply(
            new CreatedAdministrativeAreaLevel1Event(
                administrativeAreaLevel1.id.value,
                administrativeAreaLevel1.countryCommonId.value,
                administrativeAreaLevel1.code.value,
                administrativeAreaLevel1.customCode?.value,
                administrativeAreaLevel1.name.value,
                administrativeAreaLevel1.slug.value,
                administrativeAreaLevel1.createdAt?.value,
                administrativeAreaLevel1.updatedAt?.value,
                administrativeAreaLevel1.deletedAt?.value,
            )
        );
    }

    updated(administrativeAreaLevel1: AdminAdministrativeAreaLevel1): void
    {
        this.apply(
            new UpdatedAdministrativeAreaLevel1Event(
                administrativeAreaLevel1.id.value,
                administrativeAreaLevel1.countryCommonId?.value,
                administrativeAreaLevel1.code?.value,
                administrativeAreaLevel1.customCode?.value,
                administrativeAreaLevel1.name?.value,
                administrativeAreaLevel1.slug?.value,
                administrativeAreaLevel1.createdAt?.value,
                administrativeAreaLevel1.updatedAt?.value,
                administrativeAreaLevel1.deletedAt?.value,
            )
        );
    }

    deleted(administrativeAreaLevel1: AdminAdministrativeAreaLevel1): void
    {
        this.apply(
            new DeletedAdministrativeAreaLevel1Event(
                administrativeAreaLevel1.id.value,
                administrativeAreaLevel1.countryCommonId.value,
                administrativeAreaLevel1.code.value,
                administrativeAreaLevel1.customCode?.value,
                administrativeAreaLevel1.name.value,
                administrativeAreaLevel1.slug.value,
                administrativeAreaLevel1.createdAt?.value,
                administrativeAreaLevel1.updatedAt?.value,
                administrativeAreaLevel1.deletedAt?.value,
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            countryCommonId: this.countryCommonId.value,
            code: this.code.value,
            customCode: this.customCode?.value,
            name: this.name.value,
            slug: this.slug.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            country: this.country?.toDTO(),
        }
    }
}
