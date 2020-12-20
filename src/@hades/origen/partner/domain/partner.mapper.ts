import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral, CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { OrigenPartner } from './partner.aggregate';
import { PartnerResponse } from './partner.response';
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
import { CountryMapper } from '@hades/admin/country/domain/country.mapper';
import { AdministrativeAreaLevel1Mapper } from '@hades/admin/administrative-area-level-1/domain/administrative-area-level-1.mapper';
import { AdministrativeAreaLevel2Mapper } from '@hades/admin/administrative-area-level-2/domain/administrative-area-level-2.mapper';
import { AdministrativeAreaLevel3Mapper } from '@hades/admin/administrative-area-level-3/domain/administrative-area-level-3.mapper';
import { AttachmentMapper } from '@hades/admin/attachment/domain/attachment.mapper';

export class PartnerMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param partner
     */
    mapModelToAggregate(partner: ObjectLiteral, cQMetadata?: CQMetadata): OrigenPartner
    {
        if (!partner) return;

        return this.makeAggregate(partner, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param partners
     */
    mapModelsToAggregates(partners: ObjectLiteral[], cQMetadata?: CQMetadata): OrigenPartner[]
    {
        if (!Array.isArray(partners)) return;

        return partners.map(partner  => this.makeAggregate(partner, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param partner
     */
    mapAggregateToResponse(partner: OrigenPartner): PartnerResponse
    {
        return this.makeResponse(partner);
    }

    /**
     * Map array of aggregates to array responses
     * @param partners
     */
    mapAggregatesToResponses(partners: OrigenPartner[]): PartnerResponse[]
    {
        if (!Array.isArray(partners)) return;

        return partners.map(partner => this.makeResponse(partner));
    }

    private makeAggregate(partner: ObjectLiteral, cQMetadata?: CQMetadata): OrigenPartner
    {
        return OrigenPartner.register(
            new PartnerId(partner.id),
            new PartnerName(partner.name),
            new PartnerSocialNetworks(partner.socialNetworks),
            new PartnerDescription(partner.description),
            new PartnerExcerpt(partner.excerpt),
            new PartnerEmail(partner.email),
            new PartnerPhone(partner.phone),
            new PartnerFax(partner.fax),
            new PartnerCountryCommonId(partner.countryCommonId),
            new PartnerAdministrativeAreaLevel1Id(partner.administrativeAreaLevel1Id),
            new PartnerAdministrativeAreaLevel2Id(partner.administrativeAreaLevel2Id),
            new PartnerAdministrativeAreaLevel3Id(partner.administrativeAreaLevel3Id),
            new PartnerZip(partner.zip),
            new PartnerLocality(partner.locality),
            new PartnerAddress(partner.address),
            new PartnerLatitude(partner.latitude),
            new PartnerLongitude(partner.longitude),
            new PartnerCreatedAt(partner.createdAt, {}, {addTimezone: cQMetadata?.timezone}),
            new PartnerUpdatedAt(partner.updatedAt, {}, {addTimezone: cQMetadata?.timezone}),
            new PartnerDeletedAt(partner.deletedAt, {}, {addTimezone: cQMetadata?.timezone}),
            this.options.eagerLoading ? new CountryMapper({ eagerLoading: false }).mapModelToAggregate(partner.country) : undefined,
            this.options.eagerLoading ? new AdministrativeAreaLevel1Mapper({ eagerLoading: false }).mapModelToAggregate(partner.administrativeAreaLevel1) : undefined,
            this.options.eagerLoading ? new AdministrativeAreaLevel2Mapper({ eagerLoading: false }).mapModelToAggregate(partner.administrativeAreaLevel2) : undefined,
            this.options.eagerLoading ? new AdministrativeAreaLevel3Mapper({ eagerLoading: false }).mapModelToAggregate(partner.administrativeAreaLevel3) : undefined,
            this.options.eagerLoading ? new AttachmentMapper({ eagerLoading: false }).mapModelsToAggregates(partner.attachments) : undefined,
        );
    }

    private makeResponse(partner: OrigenPartner): PartnerResponse
    {
        if (!partner) return;

        return new PartnerResponse(
            partner.id.value,
            partner.name.value,
            partner.socialNetworks.value,
            partner.description.value,
            partner.excerpt.value,
            partner.email.value,
            partner.phone.value,
            partner.fax.value,
            partner.countryCommonId.value,
            partner.administrativeAreaLevel1Id.value,
            partner.administrativeAreaLevel2Id.value,
            partner.administrativeAreaLevel3Id.value,
            partner.zip.value,
            partner.locality.value,
            partner.address.value,
            partner.latitude.value,
            partner.longitude.value,
            partner.createdAt.value,
            partner.updatedAt.value,
            partner.deletedAt.value,
            this.options.eagerLoading ? new CountryMapper({ eagerLoading: false }).mapAggregateToResponse(partner.country) : undefined,
            this.options.eagerLoading ? new AdministrativeAreaLevel1Mapper({ eagerLoading: false }).mapAggregateToResponse(partner.administrativeAreaLevel1) : undefined,
            this.options.eagerLoading ? new AdministrativeAreaLevel2Mapper({ eagerLoading: false }).mapAggregateToResponse(partner.administrativeAreaLevel2) : undefined,
            this.options.eagerLoading ? new AdministrativeAreaLevel3Mapper({ eagerLoading: false }).mapAggregateToResponse(partner.administrativeAreaLevel3) : undefined,
            this.options.eagerLoading ? new AttachmentMapper({ eagerLoading: false }).mapAggregatesToResponses(partner.attachments) : undefined,
        );
    }
}