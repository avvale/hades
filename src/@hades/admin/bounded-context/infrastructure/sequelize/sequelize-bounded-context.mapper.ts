import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { AdminBoundedContext } from './../../domain/bounded-context.aggregate';
import { 
    BoundedContextId, 
    BoundedContextName, 
    BoundedContextRoot, 
    BoundedContextSort, 
    BoundedContextIsActive, 
    BoundedContextCreatedAt, 
    BoundedContextUpdatedAt, 
    BoundedContextDeletedAt
    
} from './../../domain/value-objects';

export class SequelizeBoundedContextMapper implements SequelizeMapper
{
    mapToAggregate(boundedContext: ObjectLiteral | ObjectLiteral[]): AdminBoundedContext | AdminBoundedContext[]
    {
        if (Array.isArray(boundedContext))
        {
            return boundedContext.map(item => AdminBoundedContext.register(
                    new BoundedContextId(item.id),
                    new BoundedContextName(item.name),
                    new BoundedContextRoot(item.root),
                    new BoundedContextSort(item.sort),
                    new BoundedContextIsActive(item.isActive),
                    new BoundedContextCreatedAt(item.createdAt),
                    new BoundedContextUpdatedAt(item.updatedAt),
                    new BoundedContextDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
        return AdminBoundedContext.register(
            new BoundedContextId(boundedContext.id),
            new BoundedContextName(boundedContext.name),
            new BoundedContextRoot(boundedContext.root),
            new BoundedContextSort(boundedContext.sort),
            new BoundedContextIsActive(boundedContext.isActive),
            new BoundedContextCreatedAt(boundedContext.createdAt),
            new BoundedContextUpdatedAt(boundedContext.updatedAt),
            new BoundedContextDeletedAt(boundedContext.deletedAt),
            
        );
    }
}