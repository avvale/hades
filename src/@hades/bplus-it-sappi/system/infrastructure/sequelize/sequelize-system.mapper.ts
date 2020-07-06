import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiSystem } from './../../domain/system.aggregate';
import { 
    SystemId, 
    SystemTenantId, 
    SystemName, 
    SystemTenantCode, 
    SystemEnvironment, 
    SystemVersion, 
    SystemIsActive, 
    SystemCancelledAt, 
    SystemCreatedAt, 
    SystemUpdatedAt, 
    SystemDeletedAt
    
} from './../../domain/value-objects';

export class SequelizeSystemMapper implements SequelizeMapper
{
    mapToAggregate(system: ObjectLiteral | ObjectLiteral[]): BplusItSappiSystem | BplusItSappiSystem[]
    {
        if (Array.isArray(system))
        {
            return system.map(item => BplusItSappiSystem.register(
                    new SystemId(item.id),
                    new SystemTenantId(item.tenantId),
                    new SystemName(item.name),
                    new SystemTenantCode(item.tenantCode),
                    new SystemEnvironment(item.environment),
                    new SystemVersion(item.version),
                    new SystemIsActive(item.isActive),
                    new SystemCancelledAt(item.cancelledAt),
                    new SystemCreatedAt(item.createdAt),
                    new SystemUpdatedAt(item.updatedAt),
                    new SystemDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
        return BplusItSappiSystem.register(
            new SystemId(system.id),
            new SystemTenantId(system.tenantId),
            new SystemName(system.name),
            new SystemTenantCode(system.tenantCode),
            new SystemEnvironment(system.environment),
            new SystemVersion(system.version),
            new SystemIsActive(system.isActive),
            new SystemCancelledAt(system.cancelledAt),
            new SystemCreatedAt(system.createdAt),
            new SystemUpdatedAt(system.updatedAt),
            new SystemDeletedAt(system.deletedAt),
            
        );
    }
}