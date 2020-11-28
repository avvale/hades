import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAdministrativeAreaLevel2Command } from './update-administrative-area-level-2.command';
import { UpdateAdministrativeAreaLevel2Service } from './update-administrative-area-level-2.service';
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
} from './../../domain/value-objects';

@CommandHandler(UpdateAdministrativeAreaLevel2Command)
export class UpdateAdministrativeAreaLevel2CommandHandler implements ICommandHandler<UpdateAdministrativeAreaLevel2Command>
{
    constructor(
        private readonly updateAdministrativeAreaLevel2Service: UpdateAdministrativeAreaLevel2Service,
    ) {}

    async execute(command: UpdateAdministrativeAreaLevel2Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAdministrativeAreaLevel2Service.main(
            {
                id: new AdministrativeAreaLevel2Id(command.payload.id),
                countryCommonId: new AdministrativeAreaLevel2CountryCommonId(command.payload.countryCommonId, { undefinable: true }),
                administrativeAreaLevel1Id: new AdministrativeAreaLevel2AdministrativeAreaLevel1Id(command.payload.administrativeAreaLevel1Id, { undefinable: true }),
                code: new AdministrativeAreaLevel2Code(command.payload.code, { undefinable: true }),
                customCode: new AdministrativeAreaLevel2CustomCode(command.payload.customCode),
                name: new AdministrativeAreaLevel2Name(command.payload.name, { undefinable: true }),
                slug: new AdministrativeAreaLevel2Slug(command.payload.slug, { undefinable: true }),
                latitude: new AdministrativeAreaLevel2Latitude(command.payload.latitude),
                longitude: new AdministrativeAreaLevel2Longitude(command.payload.longitude),
                zoom: new AdministrativeAreaLevel2Zoom(command.payload.zoom),
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}