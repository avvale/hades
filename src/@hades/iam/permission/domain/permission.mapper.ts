import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral } from '@hades/shared/domain/lib/hades.types';
import { IamPermission } from './permission.aggregate';
import { PermissionResponse } from './permission.response';
import {
    PermissionId,
    PermissionName,
    PermissionBoundedContextId,
    PermissionRoleIds,
    PermissionCreatedAt,
    PermissionUpdatedAt,
    PermissionDeletedAt
    
} from './value-objects';

import { BoundedContextMapper } from '@hades/iam/bounded-context/domain/bounded-context.mapper';


import { RoleMapper } from '@hades/iam/role/domain/role.mapper';

export class PermissionMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true }
    ) {}

    /**
     * Map object to aggregate
     * @param permission
     */
    mapModelToAggregate(permission: ObjectLiteral): IamPermission
    {
        if (!permission) return;

        return this.makeAggregate(permission);
    }

    /**
     * Map array of objects to array aggregates
     * @param permissions 
     */
    mapModelsToAggregates(permissions: ObjectLiteral[]): IamPermission[]
    {
        if (!Array.isArray(permissions)) return;

        return permissions.map(permission  => this.makeAggregate(permission));
    }

    /**
     * Map aggregate to response
     * @param permission
     */
    mapAggregateToResponse(permission: IamPermission): PermissionResponse
    {
        return this.makeResponse(permission);
    }

    /**
     * Map array of aggregates to array responses
     * @param permissions
     */
    mapAggregatesToResponses(permissions: IamPermission[]): PermissionResponse[]
    {
        if (!Array.isArray(permissions)) return;

        return permissions.map(permission => this.makeResponse(permission));
    }

    private makeAggregate(permission: ObjectLiteral): IamPermission
    {
        return IamPermission.register(
            new PermissionId(permission.id),
            new PermissionName(permission.name),
            new PermissionBoundedContextId(permission.boundedContextId),
            new PermissionRoleIds(permission.roleIds),
            new PermissionCreatedAt(permission.createdAt),
            new PermissionUpdatedAt(permission.updatedAt),
            new PermissionDeletedAt(permission.deletedAt),
            
            
            
            this.options.eagerLoading ? new BoundedContextMapper({ eagerLoading: false }).mapModelToAggregate(permission.boundedContext) : undefined,
            
            
            this.options.eagerLoading ? new RoleMapper({ eagerLoading: false }).mapModelsToAggregates(permission.roles) : undefined,
            
        );
    }

    private makeResponse(permission: IamPermission): PermissionResponse
    {
        if (!permission) return;

        return new PermissionResponse(
            permission.id.value,
            permission.name.value,
            permission.boundedContextId.value,
            permission.roleIds.value,
            permission.createdAt.value,
            permission.updatedAt.value,
            permission.deletedAt.value,
            
            
            
            this.options.eagerLoading ? new BoundedContextMapper({ eagerLoading: false }).mapAggregateToResponse(permission.boundedContext) : undefined,
            
            
            this.options.eagerLoading ? new RoleMapper({ eagerLoading: false }).mapAggregatesToResponses(permission.roles) : undefined,
            
        );
    }
}