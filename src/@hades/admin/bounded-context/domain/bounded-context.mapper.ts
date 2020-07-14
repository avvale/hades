import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { AdminBoundedContext } from './bounded-context.aggregate';
import { BoundedContextResponse } from './bounded-context.response';
import { 
    BoundedContextId, 
    BoundedContextName, 
    BoundedContextRoot, 
    BoundedContextSort, 
    BoundedContextIsActive, 
    BoundedContextCreatedAt, 
    BoundedContextUpdatedAt, 
    BoundedContextDeletedAt
    
} from './value-objects';

export class BoundedContextMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param boundedContext
     */
    mapObjectToAggregate(boundedContext: ObjectLiteral): AdminBoundedContext
    {
        return this.makeAggregate(boundedContext);
    }

    /**
     * Map array of objects to array aggregates
     * @param boundedContexts 
     */
    mapObjectsToAggregates(boundedContexts: ObjectLiteral[]): AdminBoundedContext[]
    {
        return boundedContexts.map(boundedContext  => this.makeAggregate(boundedContext ));
    }

    /**
     * Map aggregate to response
     * @param boundedContext 
     */
    mapAggregateToResponse(boundedContext: AdminBoundedContext): BoundedContextResponse
    {
        return this.makeResponse(boundedContext);
    }

    /**
     * Map array of aggregates to array responses
     * @param boundedContexts
     */
    mapAggregatesToResponses(boundedContexts: AdminBoundedContext[]): BoundedContextResponse[]
    {
        return boundedContexts.map(boundedContext => this.makeResponse(boundedContext));
    }

    private makeAggregate(boundedContext: ObjectLiteral): AdminBoundedContext
    {
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

    private makeResponse(boundedContext: AdminBoundedContext): BoundedContextResponse
    {
        return new BoundedContextResponse(
            boundedContext.id.value,
            boundedContext.name.value,
            boundedContext.root.value,
            boundedContext.sort.value,
            boundedContext.isActive.value,
            boundedContext.createdAt.value,
            boundedContext.updatedAt.value,
            boundedContext.deletedAt.value,
            
        );
    }
}