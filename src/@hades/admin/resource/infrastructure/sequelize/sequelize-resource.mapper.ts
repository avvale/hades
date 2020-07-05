import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { AdminResource } from './../../domain/resource.aggregate';
import { 
    ResourceId, 
    ResourceBoundedContextId, 
    ResourceName, 
    ResourceHasCustomFields, 
    ResourceHasAttachments, 
    ResourceCreatedAt, 
    ResourceUpdatedAt, 
    ResourceDeletedAt
    
} from './../../domain/value-objects';

export class SequelizeResourceMapper implements SequelizeMapper
{
    mapToAggregate(resource: ObjectLiteral | ObjectLiteral[]): AdminResource | AdminResource[]
    {
        if (Array.isArray(resource))
        {
            return resource.map(item => AdminResource.register(
                    new ResourceId(item.id),
                    new ResourceBoundedContextId(item.boundedContextId),
                    new ResourceName(item.name),
                    new ResourceHasCustomFields(item.hasCustomFields),
                    new ResourceHasAttachments(item.hasAttachments),
                    new ResourceCreatedAt(item.createdAt),
                    new ResourceUpdatedAt(item.updatedAt),
                    new ResourceDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
        return AdminResource.register(
            new ResourceId(resource.id),
            new ResourceBoundedContextId(resource.boundedContextId),
            new ResourceName(resource.name),
            new ResourceHasCustomFields(resource.hasCustomFields),
            new ResourceHasAttachments(resource.hasAttachments),
            new ResourceCreatedAt(resource.createdAt),
            new ResourceUpdatedAt(resource.updatedAt),
            new ResourceDeletedAt(resource.deletedAt),
            
        );
    }
}