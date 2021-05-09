import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCountryCommand } from './update-country.command';
import { UpdateCountryService } from './update-country.service';
import {
    CountryId,
    CountryIso3166Alpha2,
    CountryIso3166Alpha3,
    CountryIso3166Numeric,
    CountryCustomCode,
    CountryPrefix,
    CountryImage,
    CountrySort,
    CountryAdministrativeAreas,
    CountryLatitude,
    CountryLongitude,
    CountryZoom,
    CountryDataLang,
    CountryCreatedAt,
    CountryUpdatedAt,
    CountryDeletedAt,
} from './../../domain/value-objects';

@CommandHandler(UpdateCountryCommand)
export class UpdateCountryCommandHandler implements ICommandHandler<UpdateCountryCommand>
{
    constructor(
        private readonly updateCountryService: UpdateCountryService,
    ) {}

    async execute(command: UpdateCountryCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateCountryService.main(
            {
                id: new CountryId(command.payload.id),
                iso3166Alpha2: new CountryIso3166Alpha2(command.payload.iso3166Alpha2, { undefinable: true }),
                iso3166Alpha3: new CountryIso3166Alpha3(command.payload.iso3166Alpha3, { undefinable: true }),
                iso3166Numeric: new CountryIso3166Numeric(command.payload.iso3166Numeric, { undefinable: true }),
                customCode: new CountryCustomCode(command.payload.customCode),
                prefix: new CountryPrefix(command.payload.prefix),
                image: new CountryImage(command.payload.image),
                sort: new CountrySort(command.payload.sort),
                administrativeAreas: new CountryAdministrativeAreas(command.payload.administrativeAreas),
                latitude: new CountryLatitude(command.payload.latitude),
                longitude: new CountryLongitude(command.payload.longitude),
                zoom: new CountryZoom(command.payload.zoom),
                dataLang: new CountryDataLang(command.payload.dataLang),
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}