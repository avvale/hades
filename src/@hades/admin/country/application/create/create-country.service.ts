import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
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
import { ICountryRepository } from './../../domain/country.repository';
import { AdminCountry } from './../../domain/country.aggregate';

@Injectable()
export class CreateCountryService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ICountryRepository,
    ) {}

    public async main(
        payload: {
            id: CountryId,
            iso3166Alpha2: CountryIso3166Alpha2,
            iso3166Alpha3: CountryIso3166Alpha3,
            iso3166Numeric: CountryIso3166Numeric,
            customCode: CountryCustomCode,
            prefix: CountryPrefix,
            image: CountryImage,
            sort: CountrySort,
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
            payload.iso3166Alpha2,
            payload.iso3166Alpha3,
            payload.iso3166Numeric,
            payload.customCode,
            payload.prefix,
            payload.image,
            payload.sort,
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

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const countryRegister = this.publisher.mergeObjectContext(
            country
        );

        countryRegister.created(country); // apply event to model events
        countryRegister.commit(); // commit all events of model
    }
}