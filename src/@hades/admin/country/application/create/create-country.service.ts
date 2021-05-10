// ignored file
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
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
    CountryCreatedAt,
    CountryUpdatedAt,
} from './../../domain/value-objects';
import { ICountryRepository } from './../../domain/country.repository';
import { ICountryI18nRepository } from '../../domain/country-i18n.repository';
import { AdminCountry } from './../../domain/country.aggregate';

@Injectable()
export class CreateCountryService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ICountryRepository,
        private readonly repositoryI18n: ICountryI18nRepository,
    ) {}

    public async main(
        payload: {
            id: CountryId,
            langId: CountryI18nLangId,
            iso3166Alpha2: CountryIso3166Alpha2,
            iso3166Alpha3: CountryIso3166Alpha3,
            iso3166Numeric: CountryIso3166Numeric,
            customCode: CountryCustomCode,
            prefix: CountryPrefix,
            name: CountryI18nName,
            slug: CountryI18nSlug,
            image: CountryImage,
            sort: CountrySort,
            administrativeAreaLevel1: CountryI18nAdministrativeAreaLevel1,
            administrativeAreaLevel2: CountryI18nAdministrativeAreaLevel2,
            administrativeAreaLevel3: CountryI18nAdministrativeAreaLevel3,
            administrativeAreas: CountryAdministrativeAreas,
            latitude: CountryLatitude,
            longitude: CountryLongitude,
            zoom: CountryZoom,
            dataLang: CountryDataLang,
        }
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const country = AdminCountry.register(
            payload.id,
            payload.langId,
            payload.iso3166Alpha2,
            payload.iso3166Alpha3,
            payload.iso3166Numeric,
            payload.customCode,
            payload.prefix,
            payload.name,
            payload.slug,
            payload.image,
            payload.sort,
            payload.administrativeAreaLevel1,
            payload.administrativeAreaLevel2,
            payload.administrativeAreaLevel3,
            payload.administrativeAreas,
            payload.latitude,
            payload.longitude,
            payload.zoom,
            payload.dataLang,
            new CountryCreatedAt({currentTimestamp: true}),
            new CountryUpdatedAt({currentTimestamp: true}),
            null
        );

        // create
        await this.repository.create(country);
        await this.repositoryI18n.create(country, (aggregate: AdminCountry) => aggregate.toI18nDTO());

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const countryRegister = this.publisher.mergeObjectContext(
            country
        );

        countryRegister.created(country); // apply event to model events
        countryRegister.commit(); // commit all events of model
    }
}