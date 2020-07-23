import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiRole } from './role.aggregate';
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

export class RoleMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param role
     */
    mapObjectToAggregate(role: ObjectLiteral): BplusItSappiRole
    {
        return this.makeAggregate(role);
    }

    /**
     * Map array of objects to array aggregates
     * @param roles 
     */
    mapObjectsToAggregates(roles: ObjectLiteral[]): BplusItSappiRole[]
    {
        return roles.map(role  => this.makeAggregate(role ));
    }

    /**
     * Map aggregate to response
     * @param role 
     */
    mapAggregateToResponse(role: BplusItSappiRole): RoleResponse
    {
        return this.makeResponse(role);
    }

    /**
     * Map array of aggregates to array responses
     * @param roles
     */
    mapAggregatesToResponses(roles: BplusItSappiRole[]): RoleResponse[]
    {
        return roles.map(role => this.makeResponse(role));
    }

    private makeAggregate(role: ObjectLiteral): BplusItSappiRole
    {
        return BplusItSappiRole.register(
            new RoleId(role.id),
            new RoleTenantId(role.tenantId),
            new RoleTenantCode(role.tenantCode),
            new RoleName(role.name),
            new RoleCreatedAt(role.createdAt),
            new RoleUpdatedAt(role.updatedAt),
            new RoleDeletedAt(role.deletedAt),
              
        );
    }

    private makeResponse(role: BplusItSappiRole): RoleResponse
    {
        return new RoleResponse(
            role.id.value,
            role.tenantId.value,
            role.tenantCode.value,
            role.name.value,
            role.createdAt.value,
            role.updatedAt.value,
            role.deletedAt.value,
            
        );
    }
}