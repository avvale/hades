import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral, CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { CciRole } from './role.aggregate';
import { RoleResponse } from './role.response';
import {
    RoleId,
    RoleTenantId,
    RoleTenantCode,
    RoleName,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt,
} from './value-objects';
import { TenantMapper } from '@hades/iam/tenant/domain/tenant.mapper';

export class RoleMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param role
     */
    mapModelToAggregate(role: ObjectLiteral, cQMetadata?: CQMetadata): CciRole
    {
        if (!role) return;

        return this.makeAggregate(role, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param roles
     */
    mapModelsToAggregates(roles: ObjectLiteral[], cQMetadata?: CQMetadata): CciRole[]
    {
        if (!Array.isArray(roles)) return;

        return roles.map(role  => this.makeAggregate(role, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param role
     */
    mapAggregateToResponse(role: CciRole): RoleResponse
    {
        return this.makeResponse(role);
    }

    /**
     * Map array of aggregates to array responses
     * @param roles
     */
    mapAggregatesToResponses(roles: CciRole[]): RoleResponse[]
    {
        if (!Array.isArray(roles)) return;

        return roles.map(role => this.makeResponse(role));
    }

    private makeAggregate(role: ObjectLiteral, cQMetadata?: CQMetadata): CciRole
    {
        return CciRole.register(
            new RoleId(role.id),
            new RoleTenantId(role.tenantId),
            new RoleTenantCode(role.tenantCode),
            new RoleName(role.name),
            new RoleCreatedAt(role.createdAt, {}, {addTimezone: cQMetadata.timezone}),
            new RoleUpdatedAt(role.updatedAt, {}, {addTimezone: cQMetadata.timezone}),
            new RoleDeletedAt(role.deletedAt, {}, {addTimezone: cQMetadata.timezone}),
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapModelToAggregate(role.tenant) : undefined,
        );
    }

    private makeResponse(role: CciRole): RoleResponse
    {
        if (!role) return;

        return new RoleResponse(
            role.id.value,
            role.tenantId.value,
            role.tenantCode.value,
            role.name.value,
            role.createdAt.value,
            role.updatedAt.value,
            role.deletedAt.value,
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapAggregateToResponse(role.tenant) : undefined,
        );
    }
}