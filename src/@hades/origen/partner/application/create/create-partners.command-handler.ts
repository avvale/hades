import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePartnersCommand } from './create-partners.command';
import { CreatePartnersService } from './create-partners.service';
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

@CommandHandler(CreatePartnersCommand)
export class CreatePartnersCommandHandler implements ICommandHandler<CreatePartnersCommand>
{
    constructor(
        private readonly createPartnersService: CreatePartnersService,
    ) {}

    async execute(command: CreatePartnersCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createPartnersService.main(
            command.payload
                .map(partner => {
                    return {
                        id: new PartnerId(partner.id),
                        name: new PartnerName(partner.name),
                        socialNetworks: new PartnerSocialNetworks(partner.socialNetworks),
                        description: new PartnerDescription(partner.description),
                        excerpt: new PartnerExcerpt(partner.excerpt),
                        email: new PartnerEmail(partner.email),
                        phone: new PartnerPhone(partner.phone),
                        fax: new PartnerFax(partner.fax),
                        countryCommonId: new PartnerCountryCommonId(partner.countryCommonId),
                        administrativeAreaLevel1Id: new PartnerAdministrativeAreaLevel1Id(partner.administrativeAreaLevel1Id),
                        administrativeAreaLevel2Id: new PartnerAdministrativeAreaLevel2Id(partner.administrativeAreaLevel2Id),
                        administrativeAreaLevel3Id: new PartnerAdministrativeAreaLevel3Id(partner.administrativeAreaLevel3Id),
                        zip: new PartnerZip(partner.zip),
                        locality: new PartnerLocality(partner.locality),
                        address: new PartnerAddress(partner.address),
                        latitude: new PartnerLatitude(partner.latitude),
                        longitude: new PartnerLongitude(partner.longitude),
                    }
                })
        );
    }
}