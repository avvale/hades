import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { AdminModule } from './../../domain/module.entity';
import { 
    ModuleId, 
    ModuleName, 
    ModuleRoot, 
    ModuleSort, 
    ModuleIsActive, 
    ModuleCreatedAt, 
    ModuleUpdatedAt, 
    ModuleDeletedAt
    
} from './../../domain/value-objects';

export class SequelizeModuleMapper implements SequelizeMapper
{
    mapToEntity(module: ObjectLiteral | ObjectLiteral[]): AdminModule | AdminModule[]
    {
        if (Array.isArray(module))
        {
            return module.map(item => AdminModule.register(
                    new ModuleId(item.id),
                    new ModuleName(item.name),
                    new ModuleRoot(item.root),
                    new ModuleSort(item.sort),
                    new ModuleIsActive(item.isActive),
                    new ModuleCreatedAt(item.createdAt),
                    new ModuleUpdatedAt(item.updatedAt),
                    new ModuleDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
        return AdminModule.register(
            new ModuleId(module.id),
            new ModuleName(module.name),
            new ModuleRoot(module.root),
            new ModuleSort(module.sort),
            new ModuleIsActive(module.isActive),
            new ModuleCreatedAt(module.createdAt),
            new ModuleUpdatedAt(module.updatedAt),
            new ModuleDeletedAt(module.deletedAt),
            
        );
    }
}