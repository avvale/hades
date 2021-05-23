// ignored file
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCountryCommand } from './update-country.command';
import { UpdateCountryService } from './update-country.service';
import {
    CountryId,
    CountryI18nLangId,
    CountryIso3166Alpha2,
    CountryIso3166Alpha3,
    CountryIso3166Numeric,
    CountryCustomCode,
    CountryPrefix,
    CountryI18nName,
    CountryI18nSlug,
    CountryImage,
    CountrySort,
    CountryI18nAdministrativeAreaLevel1,
    CountryI18nAdministrativeAreaLevel2,
    CountryI18nAdministrativeAreaLevel3,
    CountryAdministrativeAreas,
    CountryLatitude,
    CountryLongitude,
    CountryZoom,
    CountryDataLang,
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
                langId: new CountryI18nLangId(command.payload.langId, { undefinable: true }),
                iso3166Alpha2: new CountryIso3166Alpha2(command.payload.iso3166Alpha2, { undefinable: true }),
                iso3166Alpha3: new CountryIso3166Alpha3(command.payload.iso3166Alpha3, { undefinable: true }),
                iso3166Numeric: new CountryIso3166Numeric(command.payload.iso3166Numeric, { undefinable: true }),
                customCode: new CountryCustomCode(command.payload.customCode),
                prefix: new CountryPrefix(command.payload.prefix),
                name: new CountryI18nName(command.payload.name, { undefinable: true }),
                slug: new CountryI18nSlug(command.payload.slug, { undefinable: true }),
                image: new CountryImage(command.payload.image),
                sort: new CountrySort(command.payload.sort),
                administrativeAreaLevel1: new CountryI18nAdministrativeAreaLevel1(command.payload.administrativeAreaLevel1),
                administrativeAreaLevel2: new CountryI18nAdministrativeAreaLevel2(command.payload.administrativeAreaLevel2),
                administrativeAreaLevel3: new CountryI18nAdministrativeAreaLevel3(command.payload.administrativeAreaLevel3),
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