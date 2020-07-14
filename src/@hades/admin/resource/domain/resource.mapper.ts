import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { AdminResource } from './resource.aggregate';
import { ResourceResponse } from './resource.response';
import { 
    ResourceId, 
    ResourceBoundedContextId, 
    ResourceName, 
    ResourceHasCustomFields, 
    ResourceHasAttachments, 
    ResourceCreatedAt, 
    ResourceUpdatedAt, 
    ResourceDeletedAt
    
} from './value-objects';

export class ResourceMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param resource
     */
    mapObjectToAggregate(resource: ObjectLiteral): AdminResource
    {
        return this.makeAggregate(resource);
    }

    /**
     * Map array of objects to array aggregates
     * @param resources 
     */
    mapObjectsToAggregates(resources: ObjectLiteral[]): AdminResource[]
    {
        return resources.map(resource  => this.makeAggregate(resource ));
    }

    /**
     * Map aggregate to response
     * @param resource 
     */
    mapAggregateToResponse(resource: AdminResource): ResourceResponse
    {
        return this.makeResponse(resource);
    }

    /**
     * Map array of aggregates to array responses
     * @param resources
     */
    mapAggregatesToResponses(resources: AdminResource[]): ResourceResponse[]
    {
        return resources.map(resource => this.makeResponse(resource));
    }

    private makeAggregate(resource: ObjectLiteral): AdminResource
    {
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

    private makeResponse(resource: AdminResource): ResourceResponse
    {
        return new ResourceResponse(
            resource.id.value,
            resource.boundedContextId.value,
            resource.name.value,
            resource.hasCustomFields.value,
            resource.hasAttachments.value,
            resource.createdAt.value,
            resource.updatedAt.value,
            resource.deletedAt.value,
            
        );
    }
}