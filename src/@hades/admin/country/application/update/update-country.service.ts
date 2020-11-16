import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
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
import { ICountryRepository } from './../../domain/country.repository';
import { AdminCountry } from './../../domain/country.aggregate';

@Injectable()
export class UpdateCountryService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ICountryRepository,
    ) {}

    public async main(
        payload: {
            id: CountryId,
            commonId?: CountryCommonId,
            langId?: CountryLangId,
            iso3166Alpha2?: CountryIso3166Alpha2,
            iso3166Alpha3?: CountryIso3166Alpha3,
            iso3166Numeric?: CountryIso3166Numeric,
            customCode?: CountryCustomCode,
            prefix?: CountryPrefix,
            name?: CountryName,
            slug?: CountrySlug,
            image?: CountryImage,
            sort?: CountrySort,
            administrativeAreaLevel1?: CountryAdministrativeAreaLevel1,
            administrativeAreaLevel2?: CountryAdministrativeAreaLevel2,
            administrativeAreaLevel3?: CountryAdministrativeAreaLevel3,
            administrativeAreas?: CountryAdministrativeAreas,
            latitude?: CountryLatitude,
            longitude?: CountryLongitude,
            zoom?: CountryZoom,
            dataLang?: CountryDataLang,
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const country = AdminCountry.register(
            payload.id,
            payload.commonId,
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
            null,
            new CountryUpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update(country, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const countryRegister = this.publisher.mergeObjectContext(
            country
        );

        countryRegister.updated(country); // apply event to model events
        countryRegister.commit(); // commit all events of model
    }
}