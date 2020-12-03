import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
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
} from './../../domain/value-objects';
import { IPartnerRepository } from './../../domain/partner.repository';
import { OrigenPartner } from './../../domain/partner.aggregate';

@Injectable()
export class UpdatePartnerService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IPartnerRepository,
    ) {}

    public async main(
        payload: {
            id: PartnerId,
            name?: PartnerName,
            socialNetworks?: PartnerSocialNetworks,
            description?: PartnerDescription,
            excerpt?: PartnerExcerpt,
            email?: PartnerEmail,
            phone?: PartnerPhone,
            fax?: PartnerFax,
            countryCommonId?: PartnerCountryCommonId,
            administrativeAreaLevel1Id?: PartnerAdministrativeAreaLevel1Id,
            administrativeAreaLevel2Id?: PartnerAdministrativeAreaLevel2Id,
            administrativeAreaLevel3Id?: PartnerAdministrativeAreaLevel3Id,
            zip?: PartnerZip,
            locality?: PartnerLocality,
            address?: PartnerAddress,
            latitude?: PartnerLatitude,
            longitude?: PartnerLongitude,
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const partner = OrigenPartner.register(
            payload.id,
            payload.name,
            payload.socialNetworks,
            payload.description,
            payload.excerpt,
            payload.email,
            payload.phone,
            payload.fax,
            payload.countryCommonId,
            payload.administrativeAreaLevel1Id,
            payload.administrativeAreaLevel2Id,
            payload.administrativeAreaLevel3Id,
            payload.zip,
            payload.locality,
            payload.address,
            payload.latitude,
            payload.longitude,
            null,
            new PartnerUpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update(partner, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const partnerRegister = this.publisher.mergeObjectContext(
            partner
        );

        partnerRegister.updated(partner); // apply event to model events
        partnerRegister.commit(); // commit all events of model
    }
}