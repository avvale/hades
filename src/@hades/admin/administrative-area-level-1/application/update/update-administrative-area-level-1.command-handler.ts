import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAdministrativeAreaLevel1Command } from './update-administrative-area-level-1.command';
import { UpdateAdministrativeAreaLevel1Service } from './update-administrative-area-level-1.service';
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
} from './../../domain/value-objects';

@CommandHandler(UpdateAdministrativeAreaLevel1Command)
export class UpdateAdministrativeAreaLevel1CommandHandler implements ICommandHandler<UpdateAdministrativeAreaLevel1Command>
{
    constructor(
        private readonly updateAdministrativeAreaLevel1Service: UpdateAdministrativeAreaLevel1Service,
    ) {}

    async execute(command: UpdateAdministrativeAreaLevel1Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAdministrativeAreaLevel1Service.main(
            {
                id: new AdministrativeAreaLevel1Id(command.payload.id),
                countryCommonId: new AdministrativeAreaLevel1CountryCommonId(command.payload.countryCommonId, { undefinable: true }),
                code: new AdministrativeAreaLevel1Code(command.payload.code, { undefinable: true }),
                customCode: new AdministrativeAreaLevel1CustomCode(command.payload.customCode),
                name: new AdministrativeAreaLevel1Name(command.payload.name, { undefinable: true }),
                slug: new AdministrativeAreaLevel1Slug(command.payload.slug, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}