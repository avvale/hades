import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCountryCommand } from './create-country.command';
import { CreateCountryService } from './create-country.service';
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

@CommandHandler(CreateCountryCommand)
export class CreateCountryCommandHandler implements ICommandHandler<CreateCountryCommand>
{
    constructor(
        private readonly createCountryService: CreateCountryService,
    ) {}

    async execute(command: CreateCountryCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createCountryService.main(
            {
                id: new CountryId(command.payload.id),
                iso3166Alpha2: new CountryIso3166Alpha2(command.payload.iso3166Alpha2),
                iso3166Alpha3: new CountryIso3166Alpha3(command.payload.iso3166Alpha3),
                iso3166Numeric: new CountryIso3166Numeric(command.payload.iso3166Numeric),
                customCode: new CountryCustomCode(command.payload.customCode),
                prefix: new CountryPrefix(command.payload.prefix),
                image: new CountryImage(command.payload.image),
                sort: new CountrySort(command.payload.sort),
                administrativeAreas: new CountryAdministrativeAreas(command.payload.administrativeAreas),
                latitude: new CountryLatitude(command.payload.latitude),
                longitude: new CountryLongitude(command.payload.longitude),
                zoom: new CountryZoom(command.payload.zoom),
                dataLang: new CountryDataLang(command.payload.dataLang),
            }
        );
    }
}