import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCountriesCommand } from './create-countries.command';
import { CreateCountriesService } from './create-countries.service';
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

@CommandHandler(CreateCountriesCommand)
export class CreateCountriesCommandHandler implements ICommandHandler<CreateCountriesCommand>
{
    constructor(
        private readonly createCountriesService: CreateCountriesService,
    ) {}

    async execute(command: CreateCountriesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createCountriesService.main(
            command.payload
                .map(country => {
                    return {
                        id: new CountryId(country.id),
                        iso3166Alpha2: new CountryIso3166Alpha2(country.iso3166Alpha2),
                        iso3166Alpha3: new CountryIso3166Alpha3(country.iso3166Alpha3),
                        iso3166Numeric: new CountryIso3166Numeric(country.iso3166Numeric),
                        customCode: new CountryCustomCode(country.customCode),
                        prefix: new CountryPrefix(country.prefix),
                        name: new CountryName(country.name),
                        slug: new CountrySlug(country.slug),
                        image: new CountryImage(country.image),
                        sort: new CountrySort(country.sort),
                        administrativeAreaLevel1: new CountryAdministrativeAreaLevel1(country.administrativeAreaLevel1),
                        administrativeAreaLevel2: new CountryAdministrativeAreaLevel2(country.administrativeAreaLevel2),
                        administrativeAreaLevel3: new CountryAdministrativeAreaLevel3(country.administrativeAreaLevel3),
                        administrativeAreas: new CountryAdministrativeAreas(country.administrativeAreas),
                        latitude: new CountryLatitude(country.latitude),
                        longitude: new CountryLongitude(country.longitude),
                        zoom: new CountryZoom(country.zoom),
                        dataLang: new CountryDataLang(country.dataLang),
                    }
                })
        );
    }
}