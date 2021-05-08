import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral, CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { AdminAdministrativeAreaLevel2 } from './administrative-area-level-2.aggregate';
import { AdministrativeAreaLevel2Response } from './administrative-area-level-2.response';
import {
    AdministrativeAreaLevel2Id,
    AdministrativeAreaLevel2CountryId,
    AdministrativeAreaLevel2AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel2Code,
    AdministrativeAreaLevel2CustomCode,
    AdministrativeAreaLevel2Name,
    AdministrativeAreaLevel2Slug,
    AdministrativeAreaLevel2Latitude,
    AdministrativeAreaLevel2Longitude,
    AdministrativeAreaLevel2Zoom,
    AdministrativeAreaLevel2CreatedAt,
    AdministrativeAreaLevel2UpdatedAt,
    AdministrativeAreaLevel2DeletedAt,
} from './value-objects';
import { CountryMapper } from '@hades/admin/country/domain/country.mapper';
import { AdministrativeAreaLevel1Mapper } from '@hades/admin/administrative-area-level-1/domain/administrative-area-level-1.mapper';

export class AdministrativeAreaLevel2Mapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param administrativeAreaLevel2
     */
    mapModelToAggregate(administrativeAreaLevel2: ObjectLiteral, cQMetadata?: CQMetadata): AdminAdministrativeAreaLevel2
    {
        if (!administrativeAreaLevel2) return;

        return this.makeAggregate(administrativeAreaLevel2, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param administrativeAreasLevel2
     */
    mapModelsToAggregates(administrativeAreasLevel2: ObjectLiteral[], cQMetadata?: CQMetadata): AdminAdministrativeAreaLevel2[]
    {
        if (!Array.isArray(administrativeAreasLevel2)) return;

        return administrativeAreasLevel2.map(administrativeAreaLevel2  => this.makeAggregate(administrativeAreaLevel2, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param administrativeAreaLevel2
     */
    mapAggregateToResponse(administrativeAreaLevel2: AdminAdministrativeAreaLevel2): AdministrativeAreaLevel2Response
    {
        return this.makeResponse(administrativeAreaLevel2);
    }

    /**
     * Map array of aggregates to array responses
     * @param administrativeAreasLevel2
     */
    mapAggregatesToResponses(administrativeAreasLevel2: AdminAdministrativeAreaLevel2[]): AdministrativeAreaLevel2Response[]
    {
        if (!Array.isArray(administrativeAreasLevel2)) return;

        return administrativeAreasLevel2.map(administrativeAreaLevel2 => this.makeResponse(administrativeAreaLevel2));
    }

    private makeAggregate(administrativeAreaLevel2: ObjectLiteral, cQMetadata?: CQMetadata): AdminAdministrativeAreaLevel2
    {
        return AdminAdministrativeAreaLevel2.register(
            new AdministrativeAreaLevel2Id(administrativeAreaLevel2.id),
            new AdministrativeAreaLevel2CountryId(administrativeAreaLevel2.countryId),
            new AdministrativeAreaLevel2AdministrativeAreaLevel1Id(administrativeAreaLevel2.administrativeAreaLevel1Id),
            new AdministrativeAreaLevel2Code(administrativeAreaLevel2.code),
            new AdministrativeAreaLevel2CustomCode(administrativeAreaLevel2.customCode),
            new AdministrativeAreaLevel2Name(administrativeAreaLevel2.name),
            new AdministrativeAreaLevel2Slug(administrativeAreaLevel2.slug),
            new AdministrativeAreaLevel2Latitude(administrativeAreaLevel2.latitude),
            new AdministrativeAreaLevel2Longitude(administrativeAreaLevel2.longitude),
            new AdministrativeAreaLevel2Zoom(administrativeAreaLevel2.zoom),
            new AdministrativeAreaLevel2CreatedAt(administrativeAreaLevel2.createdAt, {}, {addTimezone: cQMetadata?.timezone}),
            new AdministrativeAreaLevel2UpdatedAt(administrativeAreaLevel2.updatedAt, {}, {addTimezone: cQMetadata?.timezone}),
            new AdministrativeAreaLevel2DeletedAt(administrativeAreaLevel2.deletedAt, {}, {addTimezone: cQMetadata?.timezone}),
            this.options.eagerLoading ? new CountryMapper({ eagerLoading: false }).mapModelToAggregate(administrativeAreaLevel2.country) : undefined,
            this.options.eagerLoading ? new AdministrativeAreaLevel1Mapper({ eagerLoading: false }).mapModelToAggregate(administrativeAreaLevel2.administrativeAreaLevel1) : undefined,
        );
    }

    private makeResponse(administrativeAreaLevel2: AdminAdministrativeAreaLevel2): AdministrativeAreaLevel2Response
    {
        if (!administrativeAreaLevel2) return;

        return new AdministrativeAreaLevel2Response(
            administrativeAreaLevel2.id.value,
            administrativeAreaLevel2.countryId.value,
            administrativeAreaLevel2.administrativeAreaLevel1Id.value,
            administrativeAreaLevel2.code.value,
            administrativeAreaLevel2.customCode.value,
            administrativeAreaLevel2.name.value,
            administrativeAreaLevel2.slug.value,
            administrativeAreaLevel2.latitude.value,
            administrativeAreaLevel2.longitude.value,
            administrativeAreaLevel2.zoom.value,
            administrativeAreaLevel2.createdAt.value,
            administrativeAreaLevel2.updatedAt.value,
            administrativeAreaLevel2.deletedAt.value,
            this.options.eagerLoading ? new CountryMapper({ eagerLoading: false }).mapAggregateToResponse(administrativeAreaLevel2.country) : undefined,
            this.options.eagerLoading ? new AdministrativeAreaLevel1Mapper({ eagerLoading: false }).mapAggregateToResponse(administrativeAreaLevel2.administrativeAreaLevel1) : undefined,
        );
    }
}