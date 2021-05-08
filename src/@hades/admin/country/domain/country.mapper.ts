import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral, CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { AdminCountry } from './country.aggregate';
import { CountryResponse } from './country.response';
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
} from './value-objects';

export class CountryMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param country
     */
    mapModelToAggregate(country: ObjectLiteral, cQMetadata?: CQMetadata): AdminCountry
    {
        if (!country) return;

        return this.makeAggregate(country, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param countries
     */
    mapModelsToAggregates(countries: ObjectLiteral[], cQMetadata?: CQMetadata): AdminCountry[]
    {
        if (!Array.isArray(countries)) return;

        return countries.map(country  => this.makeAggregate(country, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param country
     */
    mapAggregateToResponse(country: AdminCountry): CountryResponse
    {
        return this.makeResponse(country);
    }

    /**
     * Map array of aggregates to array responses
     * @param countries
     */
    mapAggregatesToResponses(countries: AdminCountry[]): CountryResponse[]
    {
        if (!Array.isArray(countries)) return;

        return countries.map(country => this.makeResponse(country));
    }

    private makeAggregate(country: ObjectLiteral, cQMetadata?: CQMetadata): AdminCountry
    {
        return AdminCountry.register(
            new CountryId(country.id),
            new CountryIso3166Alpha2(country.iso3166Alpha2),
            new CountryIso3166Alpha3(country.iso3166Alpha3),
            new CountryIso3166Numeric(country.iso3166Numeric),
            new CountryCustomCode(country.customCode),
            new CountryPrefix(country.prefix),
            new CountryName(country.name),
            new CountrySlug(country.slug),
            new CountryImage(country.image),
            new CountrySort(country.sort),
            new CountryAdministrativeAreaLevel1(country.administrativeAreaLevel1),
            new CountryAdministrativeAreaLevel2(country.administrativeAreaLevel2),
            new CountryAdministrativeAreaLevel3(country.administrativeAreaLevel3),
            new CountryAdministrativeAreas(country.administrativeAreas),
            new CountryLatitude(country.latitude),
            new CountryLongitude(country.longitude),
            new CountryZoom(country.zoom),
            new CountryDataLang(country.dataLang),
            new CountryCreatedAt(country.createdAt, {}, {addTimezone: cQMetadata?.timezone}),
            new CountryUpdatedAt(country.updatedAt, {}, {addTimezone: cQMetadata?.timezone}),
            new CountryDeletedAt(country.deletedAt, {}, {addTimezone: cQMetadata?.timezone}),
        );
    }

    private makeResponse(country: AdminCountry): CountryResponse
    {
        if (!country) return;

        return new CountryResponse(
            country.id.value,
            country.iso3166Alpha2.value,
            country.iso3166Alpha3.value,
            country.iso3166Numeric.value,
            country.customCode.value,
            country.prefix.value,
            country.name.value,
            country.slug.value,
            country.image.value,
            country.sort.value,
            country.administrativeAreaLevel1.value,
            country.administrativeAreaLevel2.value,
            country.administrativeAreaLevel3.value,
            country.administrativeAreas.value,
            country.latitude.value,
            country.longitude.value,
            country.zoom.value,
            country.dataLang.value,
            country.createdAt.value,
            country.updatedAt.value,
            country.deletedAt.value,
        );
    }
}