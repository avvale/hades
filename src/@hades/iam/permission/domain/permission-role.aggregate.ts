import { AggregateRoot } from '@nestjs/cqrs';
import { 
    PermissionPermissionId, 
    PermissionRoleId
} from './value-objects';

export class IamPermissionRole extends AggregateRoot
{
    id: any;
    createdAt: any;
    updatedAt: any;
    deletedAt: any;

    permissionId: PermissionPermissionId;
    roleId: PermissionRoleId;
    
    constructor(permissionId?: PermissionPermissionId, roleId?: PermissionRoleId)
    {
        super();
        
        this.permissionId = permissionId;
        this.roleId = roleId;
    }

    static register (permissionId: PermissionPermissionId, roleId: PermissionRoleId): IamPermissionRole
    {
        return new IamPermissionRole(permissionId, roleId);
    }

    toDTO(): Object
    {
        return {
            permissionId: this.permissionId.value,
            roleId: this.roleId.value
        }
    }
}