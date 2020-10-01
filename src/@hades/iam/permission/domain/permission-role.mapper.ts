import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral } from '@hades/shared/domain/lib/hades.types';
import { IamPermissionRole } from './permission-role.aggregate';
import { 
    PermissionPermissionId,
    PermissionRoleId
    
} from './value-objects';

export class PermissionRoleMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true }
    ) {}
    
    /**
     * Map object to aggregate
     * @param permissionRole
     */
    mapModelToAggregate(permissionRole: ObjectLiteral): IamPermissionRole
    {
        if (!permissionRole) return;

        return this.makeAggregate(permissionRole);
    }

    /**
     * Map array of objects to array aggregates
     * @param permissionsRoles 
     */
    mapModelsToAggregates(permissionsRoles: ObjectLiteral[]): IamPermissionRole[]
    {
        if (!Array.isArray(permissionsRoles)) return;
        
        return permissionsRoles.map(permissionRole  => this.makeAggregate(permissionRole));
    }

    mapAggregateToResponse(permissionRole: IamPermissionRole): ObjectLiteral
    {
        return null;
    }

    mapAggregatesToResponses(permissionRole: IamPermissionRole[]): ObjectLiteral[]
    {
        return null;
    }

    private makeAggregate(permissionRole: ObjectLiteral): IamPermissionRole
    {
        return IamPermissionRole.register(
            new PermissionPermissionId(permissionRole.permissionId),
            new PermissionRoleId(permissionRole.roleId),
        );
    }
}