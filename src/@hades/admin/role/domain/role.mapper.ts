import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { AdminRole } from './role.aggregate';
import { RoleResponse } from './role.response';
import { 
    RoleId, 
    RoleName, 
    RoleIsMaster, 
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
    mapObjectToAggregate(role: ObjectLiteral): AdminRole
    {
        return this.makeAggregate(role);
    }

    /**
     * Map array of objects to array aggregates
     * @param roles 
     */
    mapObjectsToAggregates(roles: ObjectLiteral[]): AdminRole[]
    {
        return roles.map(role  => this.makeAggregate(role ));
    }

    /**
     * Map aggregate to response
     * @param role 
     */
    mapAggregateToResponse(role: AdminRole): RoleResponse
    {
        return this.makeResponse(role);
    }

    /**
     * Map array of aggregates to array responses
     * @param roles
     */
    mapAggregatesToResponses(roles: AdminRole[]): RoleResponse[]
    {
        return roles.map(role => this.makeResponse(role));
    }

    private makeAggregate(role: ObjectLiteral): AdminRole
    {
        return AdminRole.register(
            new RoleId(role.id),
            new RoleName(role.name),
            new RoleIsMaster(role.isMaster),
            new RoleCreatedAt(role.createdAt),
            new RoleUpdatedAt(role.updatedAt),
            new RoleDeletedAt(role.deletedAt),
              
        );
    }

    private makeResponse(role: AdminRole): RoleResponse
    {
        return new RoleResponse(
            role.id.value,
            role.name.value,
            role.isMaster.value,
            role.createdAt.value,
            role.updatedAt.value,
            role.deletedAt.value,
            
        );
    }
}