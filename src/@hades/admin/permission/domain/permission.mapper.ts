import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { AdminPermission } from './permission.aggregate';
import { PermissionResponse } from './permission.response';
import { 
    PermissionId, 
    PermissionBoundedContextId, 
    PermissionName, 
    PermissionCreatedAt, 
    PermissionUpdatedAt, 
    PermissionDeletedAt
    
} from './value-objects';

export class PermissionMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param permission
     */
    mapObjectToAggregate(permission: ObjectLiteral): AdminPermission
    {
        return this.makeAggregate(permission);
    }

    /**
     * Map array of objects to array aggregates
     * @param permissions 
     */
    mapObjectsToAggregates(permissions: ObjectLiteral[]): AdminPermission[]
    {
        return permissions.map(permission  => this.makeAggregate(permission ));
    }

    /**
     * Map aggregate to response
     * @param permission 
     */
    mapAggregateToResponse(permission: AdminPermission): PermissionResponse
    {
        return this.makeResponse(permission);
    }

    /**
     * Map array of aggregates to array responses
     * @param permissions
     */
    mapAggregatesToResponses(permissions: AdminPermission[]): PermissionResponse[]
    {
        return permissions.map(permission => this.makeResponse(permission));
    }

    private makeAggregate(permission: ObjectLiteral): AdminPermission
    {
        return AdminPermission.register(
            new PermissionId(permission.id),
            new PermissionBoundedContextId(permission.boundedContextId),
            new PermissionName(permission.name),
            new PermissionCreatedAt(permission.createdAt),
            new PermissionUpdatedAt(permission.updatedAt),
            new PermissionDeletedAt(permission.deletedAt),
              
        );
    }

    private makeResponse(permission: AdminPermission): PermissionResponse
    {
        return new PermissionResponse(
            permission.id.value,
            permission.boundedContextId.value,
            permission.name.value,
            permission.createdAt.value,
            permission.updatedAt.value,
            permission.deletedAt.value,
            
        );
    }
}