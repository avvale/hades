import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { AdminPermission } from './../../domain/permission.entity';
import { 
    PermissionId, 
    PermissionModuleId, 
    PermissionName, 
    PermissionCreatedAt, 
    PermissionUpdatedAt, 
    PermissionDeletedAt
    
} from './../../domain/value-objects';

export class SequelizePermissionMapper implements SequelizeMapper
{
    mapToEntity(permission: ObjectLiteral | ObjectLiteral[]): AdminPermission | AdminPermission[]
    {
        if (Array.isArray(permission))
        {
            return permission.map(item => AdminPermission.register(
                    new PermissionId(item.id),
                    new PermissionModuleId(item.moduleId),
                    new PermissionName(item.name),
                    new PermissionCreatedAt(item.createdAt),
                    new PermissionUpdatedAt(item.updatedAt),
                    new PermissionDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
        return AdminPermission.register(
            new PermissionId(permission.id),
            new PermissionModuleId(permission.moduleId),
            new PermissionName(permission.name),
            new PermissionCreatedAt(permission.createdAt),
            new PermissionUpdatedAt(permission.updatedAt),
            new PermissionDeletedAt(permission.deletedAt),
            
        );
    }
}