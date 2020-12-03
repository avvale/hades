import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePartnerCommand } from './update-partner.command';
import { UpdatePartnerService } from './update-partner.service';
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

@CommandHandler(UpdatePartnerCommand)
export class UpdatePartnerCommandHandler implements ICommandHandler<UpdatePartnerCommand>
{
    constructor(
        private readonly updatePartnerService: UpdatePartnerService,
    ) {}

    async execute(command: UpdatePartnerCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updatePartnerService.main(
            {
                id: new PartnerId(command.payload.id),
                name: new PartnerName(command.payload.name, { undefinable: true }),
                socialNetworks: new PartnerSocialNetworks(command.payload.socialNetworks),
                description: new PartnerDescription(command.payload.description),
                excerpt: new PartnerExcerpt(command.payload.excerpt),
                email: new PartnerEmail(command.payload.email),
                phone: new PartnerPhone(command.payload.phone),
                fax: new PartnerFax(command.payload.fax),
                countryCommonId: new PartnerCountryCommonId(command.payload.countryCommonId, { undefinable: true }),
                administrativeAreaLevel1Id: new PartnerAdministrativeAreaLevel1Id(command.payload.administrativeAreaLevel1Id),
                administrativeAreaLevel2Id: new PartnerAdministrativeAreaLevel2Id(command.payload.administrativeAreaLevel2Id),
                administrativeAreaLevel3Id: new PartnerAdministrativeAreaLevel3Id(command.payload.administrativeAreaLevel3Id),
                zip: new PartnerZip(command.payload.zip),
                locality: new PartnerLocality(command.payload.locality),
                address: new PartnerAddress(command.payload.address),
                latitude: new PartnerLatitude(command.payload.latitude),
                longitude: new PartnerLongitude(command.payload.longitude),
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}