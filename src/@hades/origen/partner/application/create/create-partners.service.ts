import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
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
import { AddPartnersContextEvent } from './../events/add-partners-context.event';

@Injectable()
export class CreatePartnersService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IPartnerRepository,
    ) {}

    public async main(
        partners: {
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
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregatePartners = partners.map(partner => OriginPartner.register(
            partner.id,
            partner.name,
            partner.socialNetworks,
            partner.description,
            partner.excerpt,
            partner.email,
            partner.phone,
            partner.fax,
            partner.countryCommonId,
            partner.administrativeAreaLevel1Id,
            partner.administrativeAreaLevel2Id,
            partner.administrativeAreaLevel3Id,
            partner.zip,
            partner.locality,
            partner.address,
            partner.latitude,
            partner.longitude,
            new PartnerCreatedAt({currentTimestamp: true}),
            new PartnerUpdatedAt({currentTimestamp: true}),
            null
        ));

        // insert
        await this.repository.insert(aggregatePartners);

        // create AddPartnersContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const partnersRegistered = this.publisher.mergeObjectContext(new AddPartnersContextEvent(aggregatePartners));

        partnersRegistered.created(); // apply event to model events
        partnersRegistered.commit(); // commit all events of model
    }
}