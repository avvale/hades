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
    CountryName,
    CountrySlug,
    CountryImage,
    CountrySort,
    CountryAdministrativeAreaLevel1,
    CountryAdministrativeAreaLevel2,
    CountryAdministrativeAreaLevel3,
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
                name: new CountryName(command.payload.name),
                slug: new CountrySlug(command.payload.slug),
                image: new CountryImage(command.payload.image),
                sort: new CountrySort(command.payload.sort),
                administrativeAreaLevel1: new CountryAdministrativeAreaLevel1(command.payload.administrativeAreaLevel1),
                administrativeAreaLevel2: new CountryAdministrativeAreaLevel2(command.payload.administrativeAreaLevel2),
                administrativeAreaLevel3: new CountryAdministrativeAreaLevel3(command.payload.administrativeAreaLevel3),
                administrativeAreas: new CountryAdministrativeAreas(command.payload.administrativeAreas),
                latitude: new CountryLatitude(command.payload.latitude),
                longitude: new CountryLongitude(command.payload.longitude),
                zoom: new CountryZoom(command.payload.zoom),
                dataLang: new CountryDataLang(command.payload.dataLang),
            }
        );
    }
}