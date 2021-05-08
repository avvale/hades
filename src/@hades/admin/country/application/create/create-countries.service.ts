import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
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
import { ICountryRepository } from './../../domain/country.repository';
import { AdminCountry } from './../../domain/country.aggregate';
import { AddCountriesContextEvent } from './../events/add-countries-context.event';

@Injectable()
export class CreateCountriesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ICountryRepository,
    ) {}

    public async main(
        countries: {
            id: CountryId,
            iso3166Alpha2: CountryIso3166Alpha2,
            iso3166Alpha3: CountryIso3166Alpha3,
            iso3166Numeric: CountryIso3166Numeric,
            customCode: CountryCustomCode,
            prefix: CountryPrefix,
            name: CountryName,
            slug: CountrySlug,
            image: CountryImage,
            sort: CountrySort,
            administrativeAreaLevel1: CountryAdministrativeAreaLevel1,
            administrativeAreaLevel2: CountryAdministrativeAreaLevel2,
            administrativeAreaLevel3: CountryAdministrativeAreaLevel3,
            administrativeAreas: CountryAdministrativeAreas,
            latitude: CountryLatitude,
            longitude: CountryLongitude,
            zoom: CountryZoom,
            dataLang: CountryDataLang,
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateCountries = countries.map(country => AdminCountry.register(
            country.id,
            country.iso3166Alpha2,
            country.iso3166Alpha3,
            country.iso3166Numeric,
            country.customCode,
            country.prefix,
            country.name,
            country.slug,
            country.image,
            country.sort,
            country.administrativeAreaLevel1,
            country.administrativeAreaLevel2,
            country.administrativeAreaLevel3,
            country.administrativeAreas,
            country.latitude,
            country.longitude,
            country.zoom,
            country.dataLang,
            new CountryCreatedAt({currentTimestamp: true}),
            new CountryUpdatedAt({currentTimestamp: true}),
            null
        ));

        // insert
        await this.repository.insert(aggregateCountries);

        // create AddCountriesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const countriesRegistered = this.publisher.mergeObjectContext(new AddCountriesContextEvent(aggregateCountries));

        countriesRegistered.created(); // apply event to model events
        countriesRegistered.commit(); // commit all events of model
    }
}