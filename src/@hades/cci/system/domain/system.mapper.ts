import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral, CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { CciSystem } from './system.aggregate';
import { SystemResponse } from './system.response';
import {
    SystemId,
    SystemTenantId,
    SystemTenantCode,
    SystemVersion,
    SystemName,
    SystemEnvironment,
    SystemTechnology,
    SystemIsActive,
    SystemCancelledAt,
    SystemCreatedAt,
    SystemUpdatedAt,
    SystemDeletedAt,
} from './value-objects';
import { TenantMapper } from '@hades/iam/tenant/domain/tenant.mapper';

export class SystemMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param system
     */
    mapModelToAggregate(system: ObjectLiteral, cQMetadata?: CQMetadata): CciSystem
    {
        if (!system) return;

        return this.makeAggregate(system, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param systems
     */
    mapModelsToAggregates(systems: ObjectLiteral[], cQMetadata?: CQMetadata): CciSystem[]
    {
        if (!Array.isArray(systems)) return;

        return systems.map(system  => this.makeAggregate(system, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param system
     */
    mapAggregateToResponse(system: CciSystem): SystemResponse
    {
        return this.makeResponse(system);
    }

    /**
     * Map array of aggregates to array responses
     * @param systems
     */
    mapAggregatesToResponses(systems: CciSystem[]): SystemResponse[]
    {
        if (!Array.isArray(systems)) return;

        return systems.map(system => this.makeResponse(system));
    }

    private makeAggregate(system: ObjectLiteral, cQMetadata?: CQMetadata): CciSystem
    {
        return CciSystem.register(
            new SystemId(system.id),
            new SystemTenantId(system.tenantId),
            new SystemTenantCode(system.tenantCode),
            new SystemVersion(system.version),
            new SystemName(system.name),
            new SystemEnvironment(system.environment),
            new SystemTechnology(system.technology),
            new SystemIsActive(system.isActive),
            new SystemCancelledAt(system.cancelledAt, {}, {addTimezone: cQMetadata.timezone}),
            new SystemCreatedAt(system.createdAt, {}, {addTimezone: cQMetadata.timezone}),
            new SystemUpdatedAt(system.updatedAt, {}, {addTimezone: cQMetadata.timezone}),
            new SystemDeletedAt(system.deletedAt, {}, {addTimezone: cQMetadata.timezone}),
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapModelToAggregate(system.tenant) : undefined,
        );
    }

    private makeResponse(system: CciSystem): SystemResponse
    {
        if (!system) return;

        return new SystemResponse(
            system.id.value,
            system.tenantId.value,
            system.tenantCode.value,
            system.version.value,
            system.name.value,
            system.environment.value,
            system.technology.value,
            system.isActive.value,
            system.cancelledAt.value,
            system.createdAt.value,
            system.updatedAt.value,
            system.deletedAt.value,
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapAggregateToResponse(system.tenant) : undefined,
        );
    }
}