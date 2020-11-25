import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCountryCommand } from './update-country.command';
import { UpdateCountryService } from './update-country.service';
import {
    CountryId,
    CountryCommonId,
    CountryLangId,
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
                commonId: new CountryCommonId(command.payload.commonId, { undefinable: true }),
                langId: new CountryLangId(command.payload.langId, { undefinable: true }),
                iso3166Alpha2: new CountryIso3166Alpha2(command.payload.iso3166Alpha2, { undefinable: true }),
                iso3166Alpha3: new CountryIso3166Alpha3(command.payload.iso3166Alpha3, { undefinable: true }),
                iso3166Numeric: new CountryIso3166Numeric(command.payload.iso3166Numeric, { undefinable: true }),
                customCode: new CountryCustomCode(command.payload.customCode),
                prefix: new CountryPrefix(command.payload.prefix),
                name: new CountryName(command.payload.name, { undefinable: true }),
                slug: new CountrySlug(command.payload.slug, { undefinable: true }),
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
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}