import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral } from '@hades/shared/domain/lib/hades.types';
import { CciRole } from './role.aggregate';
import { RoleResponse } from './role.response';
import { 
    RoleId,
    RoleTenantId,
    RoleTenantCode,
    RoleName,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt
    
} from './value-objects';
import { TenantMapper } from '@hades/admin/tenant/domain/tenant.mapper';



export class RoleMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true }
    ) {}
    
    /**
     * Map object to aggregate
     * @param role
     */
    mapModelToAggregate(role: ObjectLiteral): CciRole
    {
        if (!role) return;

        return this.makeAggregate(role);
    }

    /**
     * Map array of objects to array aggregates
     * @param roles 
     */
    mapModelsToAggregates(roles: ObjectLiteral[]): CciRole[]
    {
        if (!Array.isArray(roles)) return;
        
        return roles.map(role  => this.makeAggregate(role));
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

    private makeAggregate(role: ObjectLiteral): CciRole
    {
        return CciRole.register(
            new RoleId(role.id),
            new RoleTenantId(role.tenantId),
            new RoleTenantCode(role.tenantCode),
            new RoleName(role.name),
            new RoleCreatedAt(role.createdAt),
            new RoleUpdatedAt(role.updatedAt),
            new RoleDeletedAt(role.deletedAt),
            
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