import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiRole } from './../../domain/role.entity';
import { 
    RoleId, 
    RoleTenantId, 
    RoleName, 
    RoleCreatedAt, 
    RoleUpdatedAt, 
    RoleDeletedAt
    
} from './../../domain/value-objects';

export class SequelizeRoleMapper implements SequelizeMapper
{
    mapToEntity(role: ObjectLiteral | ObjectLiteral[]): BplusItSappiRole | BplusItSappiRole[]
    {
        if (Array.isArray(role))
        {
            return role.map(item => BplusItSappiRole.register(
                    new RoleId(item.id),
                    new RoleTenantId(item.tenantId),
                    new RoleName(item.name),
                    new RoleCreatedAt(item.createdAt),
                    new RoleUpdatedAt(item.updatedAt),
                    new RoleDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
        return BplusItSappiRole.register(
            new RoleId(role.id),
            new RoleTenantId(role.tenantId),
            new RoleName(role.name),
            new RoleCreatedAt(role.createdAt),
            new RoleUpdatedAt(role.updatedAt),
            new RoleDeletedAt(role.deletedAt),
            
        );
    }
}