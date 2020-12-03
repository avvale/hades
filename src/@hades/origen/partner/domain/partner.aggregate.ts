import { AggregateRoot } from '@nestjs/cqrs';
import {
    PartnerId,
    PartnerName,
    PartnerSocialNetworks,
    PartnerDescription,
    PartnerExcerpt,
    PartnerEmail,
    PartnerPhone,
    PartnerFax,
    PartnerCountryCommonId,
    PartnerAdministrativeAreaLevel1Id,
    PartnerAdministrativeAreaLevel2Id,
    PartnerAdministrativeAreaLevel3Id,
    PartnerZip,
    PartnerLocality,
    PartnerAddress,
    PartnerLatitude,
    PartnerLongitude,
    PartnerCreatedAt,
    PartnerUpdatedAt,
    PartnerDeletedAt,
} from './value-objects';
import { CreatedPartnerEvent } from './../application/events/created-partner.event';
import { UpdatedPartnerEvent } from './../application/events/updated-partner.event';
import { DeletedPartnerEvent } from './../application/events/deleted-partner.event';
import { AdminCountry } from '@hades/admin/country/domain/country.aggregate';
import { AdminAdministrativeAreaLevel1 } from '@hades/admin/administrative-area-level-1/domain/administrative-area-level-1.aggregate';
import { AdminAdministrativeAreaLevel2 } from '@hades/admin/administrative-area-level-2/domain/administrative-area-level-2.aggregate';
import { AdminAdministrativeAreaLevel3 } from '@hades/admin/administrative-area-level-3/domain/administrative-area-level-3.aggregate';

export class OriginPartner extends AggregateRoot
{
    id: PartnerId;
    name: PartnerName;
    socialNetworks: PartnerSocialNetworks;
    description: PartnerDescription;
    excerpt: PartnerExcerpt;
    email: PartnerEmail;
    phone: PartnerPhone;
    fax: PartnerFax;
    countryCommonId: PartnerCountryCommonId;
    administrativeAreaLevel1Id: PartnerAdministrativeAreaLevel1Id;
    administrativeAreaLevel2Id: PartnerAdministrativeAreaLevel2Id;
    administrativeAreaLevel3Id: PartnerAdministrativeAreaLevel3Id;
    zip: PartnerZip;
    locality: PartnerLocality;
    address: PartnerAddress;
    latitude: PartnerLatitude;
    longitude: PartnerLongitude;
    createdAt: PartnerCreatedAt;
    updatedAt: PartnerUpdatedAt;
    deletedAt: PartnerDeletedAt;

    // eager relationship
    country: AdminCountry;
    administrativeAreaLevel1: AdminAdministrativeAreaLevel1;
    administrativeAreaLevel2: AdminAdministrativeAreaLevel2;
    administrativeAreaLevel3: AdminAdministrativeAreaLevel3;

    constructor(
        id: PartnerId,
        name: PartnerName,
        socialNetworks: PartnerSocialNetworks,
        description: PartnerDescription,
        excerpt: PartnerExcerpt,
        email: PartnerEmail,
        phone: PartnerPhone,
        fax: PartnerFax,
        countryCommonId: PartnerCountryCommonId,
        administrativeAreaLevel1Id: PartnerAdministrativeAreaLevel1Id,
        administrativeAreaLevel2Id: PartnerAdministrativeAreaLevel2Id,
        administrativeAreaLevel3Id: PartnerAdministrativeAreaLevel3Id,
        zip: PartnerZip,
        locality: PartnerLocality,
        address: PartnerAddress,
        latitude: PartnerLatitude,
        longitude: PartnerLongitude,
        createdAt: PartnerCreatedAt,
        updatedAt: PartnerUpdatedAt,
        deletedAt: PartnerDeletedAt,
        country?: AdminCountry,
        administrativeAreaLevel1?: AdminAdministrativeAreaLevel1,
        administrativeAreaLevel2?: AdminAdministrativeAreaLevel2,
        administrativeAreaLevel3?: AdminAdministrativeAreaLevel3,
    )
    {
        super();

        this.id = id;
        this.name = name;
        this.socialNetworks = socialNetworks;
        this.description = description;
        this.excerpt = excerpt;
        this.email = email;
        this.phone = phone;
        this.fax = fax;
        this.countryCommonId = countryCommonId;
        this.administrativeAreaLevel1Id = administrativeAreaLevel1Id;
        this.administrativeAreaLevel2Id = administrativeAreaLevel2Id;
        this.administrativeAreaLevel3Id = administrativeAreaLevel3Id;
        this.zip = zip;
        this.locality = locality;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.country = country;
        this.administrativeAreaLevel1 = administrativeAreaLevel1;
        this.administrativeAreaLevel2 = administrativeAreaLevel2;
        this.administrativeAreaLevel3 = administrativeAreaLevel3;
    }

    static register (
        id: PartnerId,
        name: PartnerName,
        socialNetworks: PartnerSocialNetworks,
        description: PartnerDescription,
        excerpt: PartnerExcerpt,
        email: PartnerEmail,
        phone: PartnerPhone,
        fax: PartnerFax,
        countryCommonId: PartnerCountryCommonId,
        administrativeAreaLevel1Id: PartnerAdministrativeAreaLevel1Id,
        administrativeAreaLevel2Id: PartnerAdministrativeAreaLevel2Id,
        administrativeAreaLevel3Id: PartnerAdministrativeAreaLevel3Id,
        zip: PartnerZip,
        locality: PartnerLocality,
        address: PartnerAddress,
        latitude: PartnerLatitude,
        longitude: PartnerLongitude,
        createdAt: PartnerCreatedAt,
        updatedAt: PartnerUpdatedAt,
        deletedAt: PartnerDeletedAt,
        country?: AdminCountry,
        administrativeAreaLevel1?: AdminAdministrativeAreaLevel1,
        administrativeAreaLevel2?: AdminAdministrativeAreaLevel2,
        administrativeAreaLevel3?: AdminAdministrativeAreaLevel3,
    ): OriginPartner
    {
        return new OriginPartner(
            id,
            name,
            socialNetworks,
            description,
            excerpt,
            email,
            phone,
            fax,
            countryCommonId,
            administrativeAreaLevel1Id,
            administrativeAreaLevel2Id,
            administrativeAreaLevel3Id,
            zip,
            locality,
            address,
            latitude,
            longitude,
            createdAt,
            updatedAt,
            deletedAt,
            country,
            administrativeAreaLevel1,
            administrativeAreaLevel2,
            administrativeAreaLevel3,
        );
    }

    created(partner: OriginPartner): void
    {
        this.apply(
            new CreatedPartnerEvent(
                partner.id.value,
                partner.name.value,
                partner.socialNetworks?.value,
                partner.description?.value,
                partner.excerpt?.value,
                partner.email?.value,
                partner.phone?.value,
                partner.fax?.value,
                partner.countryCommonId.value,
                partner.administrativeAreaLevel1Id?.value,
                partner.administrativeAreaLevel2Id?.value,
                partner.administrativeAreaLevel3Id?.value,
                partner.zip?.value,
                partner.locality?.value,
                partner.address?.value,
                partner.latitude?.value,
                partner.longitude?.value,
                partner.createdAt?.value,
                partner.updatedAt?.value,
                partner.deletedAt?.value,
            )
        );
    }

    updated(partner: OriginPartner): void
    {
        this.apply(
            new UpdatedPartnerEvent(
                partner.id.value,
                partner.name?.value,
                partner.socialNetworks?.value,
                partner.description?.value,
                partner.excerpt?.value,
                partner.email?.value,
                partner.phone?.value,
                partner.fax?.value,
                partner.countryCommonId?.value,
                partner.administrativeAreaLevel1Id?.value,
                partner.administrativeAreaLevel2Id?.value,
                partner.administrativeAreaLevel3Id?.value,
                partner.zip?.value,
                partner.locality?.value,
                partner.address?.value,
                partner.latitude?.value,
                partner.longitude?.value,
                partner.createdAt?.value,
                partner.updatedAt?.value,
                partner.deletedAt?.value,
            )
        );
    }

    deleted(partner: OriginPartner): void
    {
        this.apply(
            new DeletedPartnerEvent(
                partner.id.value,
                partner.name.value,
                partner.socialNetworks?.value,
                partner.description?.value,
                partner.excerpt?.value,
                partner.email?.value,
                partner.phone?.value,
                partner.fax?.value,
                partner.countryCommonId.value,
                partner.administrativeAreaLevel1Id?.value,
                partner.administrativeAreaLevel2Id?.value,
                partner.administrativeAreaLevel3Id?.value,
                partner.zip?.value,
                partner.locality?.value,
                partner.address?.value,
                partner.latitude?.value,
                partner.longitude?.value,
                partner.createdAt?.value,
                partner.updatedAt?.value,
                partner.deletedAt?.value,
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            name: this.name.value,
            socialNetworks: this.socialNetworks?.value,
            description: this.description?.value,
            excerpt: this.excerpt?.value,
            email: this.email?.value,
            phone: this.phone?.value,
            fax: this.fax?.value,
            countryCommonId: this.countryCommonId.value,
            administrativeAreaLevel1Id: this.administrativeAreaLevel1Id?.value,
            administrativeAreaLevel2Id: this.administrativeAreaLevel2Id?.value,
            administrativeAreaLevel3Id: this.administrativeAreaLevel3Id?.value,
            zip: this.zip?.value,
            locality: this.locality?.value,
            address: this.address?.value,
            latitude: this.latitude?.value,
            longitude: this.longitude?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            country: this.country?.toDTO(),
            administrativeAreaLevel1: this.administrativeAreaLevel1?.toDTO(),
            administrativeAreaLevel2: this.administrativeAreaLevel2?.toDTO(),
            administrativeAreaLevel3: this.administrativeAreaLevel3?.toDTO(),
        }
    }
}
