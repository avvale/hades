import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { AdminTenant } from './../../domain/tenant.entity';
import { 
    TenantId, 
    TenantName, 
    TenantCode, 
    TenantLogo, 
    TenantIsActive, 
    TenantData, 
    TenantCreatedAt, 
    TenantUpdatedAt, 
    TenantDeletedAt
    
} from './../../domain/value-objects';

export class SequelizeTenantMapper implements SequelizeMapper
{
    mapToEntity(tenant: ObjectLiteral | ObjectLiteral[]): AdminTenant | AdminTenant[]
    {
        if (Array.isArray(tenant))
        {
            return tenant.map(item => AdminTenant.register(
                    new TenantId(item.id),
                    new TenantName(item.name),
                    new TenantCode(item.code),
                    new TenantLogo(item.logo),
                    new TenantIsActive(item.isActive),
                    new TenantData(item.data),
                    new TenantCreatedAt(item.createdAt),
                    new TenantUpdatedAt(item.updatedAt),
                    new TenantDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
        return AdminTenant.register(
            new TenantId(tenant.id),
            new TenantName(tenant.name),
            new TenantCode(tenant.code),
            new TenantLogo(tenant.logo),
            new TenantIsActive(tenant.isActive),
            new TenantData(tenant.data),
            new TenantCreatedAt(tenant.createdAt),
            new TenantUpdatedAt(tenant.updatedAt),
            new TenantDeletedAt(tenant.deletedAt),
            
        );
    }
}