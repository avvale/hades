import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePartnerCommand } from './create-partner.command';
import { CreatePartnerService } from './create-partner.service';
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

@CommandHandler(CreatePartnerCommand)
export class CreatePartnerCommandHandler implements ICommandHandler<CreatePartnerCommand>
{
    constructor(
        private readonly createPartnerService: CreatePartnerService,
    ) {}

    async execute(command: CreatePartnerCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createPartnerService.main(
            {
                id: new PartnerId(command.payload.id),
                name: new PartnerName(command.payload.name),
                socialNetworks: new PartnerSocialNetworks(command.payload.socialNetworks),
                description: new PartnerDescription(command.payload.description),
                excerpt: new PartnerExcerpt(command.payload.excerpt),
                email: new PartnerEmail(command.payload.email),
                phone: new PartnerPhone(command.payload.phone),
                fax: new PartnerFax(command.payload.fax),
                countryCommonId: new PartnerCountryCommonId(command.payload.countryCommonId),
                administrativeAreaLevel1Id: new PartnerAdministrativeAreaLevel1Id(command.payload.administrativeAreaLevel1Id),
                administrativeAreaLevel2Id: new PartnerAdministrativeAreaLevel2Id(command.payload.administrativeAreaLevel2Id),
                administrativeAreaLevel3Id: new PartnerAdministrativeAreaLevel3Id(command.payload.administrativeAreaLevel3Id),
                zip: new PartnerZip(command.payload.zip),
                locality: new PartnerLocality(command.payload.locality),
                address: new PartnerAddress(command.payload.address),
                latitude: new PartnerLatitude(command.payload.latitude),
                longitude: new PartnerLongitude(command.payload.longitude),
            }
        );
    }
}