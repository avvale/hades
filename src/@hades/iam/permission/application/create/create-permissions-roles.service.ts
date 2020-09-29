import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { 
    PermissionPermissionId,
    PermissionRoleId
    
} from './../../domain/value-objects';
import { IPermissionRoleRepository } from './../../domain/permission-role.repository';
import { IamPermissionRole } from '../../domain/permission-role.aggregate';

@Injectable()
export class CreatePermissionsRolesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IPermissionRoleRepository
    ) {}

    public async main(
        permissionsRoles: {
            permissionId: PermissionPermissionId,
            roleId: PermissionRoleId
            
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregatePermissions = permissionsRoles.map(permission => IamPermissionRole.register(
            permission.permissionId,
            permission.roleId
        ));
        
        // insert
        await this.repository.insert(aggregatePermissions);
    }
}