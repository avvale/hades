import { AggregateRoot } from '@nestjs/cqrs';
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
import { CreatedResourceEvent } from './../application/events/created-resource.event';
import { UpdatedResourceEvent } from './../application/events/updated-resource.event';
import { DeletedResourceEvent } from './../application/events/deleted-resource.event';
import { AdminBoundedContext } from '@hades/admin/bounded-context/domain/bounded-context.aggregate';

export class AdminResource extends AggregateRoot
{
    id: ResourceId;
    boundedContextId: ResourceBoundedContextId;
    boundedContext: AdminBoundedContext;
    name: ResourceName;
    hasCustomFields: ResourceHasCustomFields;
    hasAttachments: ResourceHasAttachments;
    createdAt: ResourceCreatedAt;
    updatedAt: ResourceUpdatedAt;
    deletedAt: ResourceDeletedAt;
    
    constructor(id?: ResourceId, boundedContextId?: ResourceBoundedContextId, name?: ResourceName, hasCustomFields?: ResourceHasCustomFields, hasAttachments?: ResourceHasAttachments, createdAt?: ResourceCreatedAt, updatedAt?: ResourceUpdatedAt, deletedAt?: ResourceDeletedAt, )
    {
        super();
        
        this.id = id;
        this.boundedContextId = boundedContextId;
        this.name = name;
        this.hasCustomFields = hasCustomFields;
        this.hasAttachments = hasAttachments;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: ResourceId,boundedContextId: ResourceBoundedContextId,name: ResourceName,hasCustomFields: ResourceHasCustomFields,hasAttachments: ResourceHasAttachments,createdAt: ResourceCreatedAt,updatedAt: ResourceUpdatedAt,deletedAt: ResourceDeletedAt,): AdminResource
    {
        return new AdminResource(id, boundedContextId, name, hasCustomFields, hasAttachments, createdAt, updatedAt, deletedAt, );
    }

    created(resource: AdminResource): void
    {
        this.apply(
            new CreatedResourceEvent(
                resource.id.value,
                resource.boundedContextId.value,
                resource.name.value,
                resource.hasCustomFields.value,
                resource.hasAttachments.value,
                resource.createdAt?.value,
                resource.updatedAt?.value,
                resource.deletedAt?.value,
                
            )
        );
    }

    updated(resource: AdminResource): void
    {
        this.apply(
            new UpdatedResourceEvent(
                resource.id.value,
                resource.boundedContextId?.value,
                resource.name?.value,
                resource.hasCustomFields?.value,
                resource.hasAttachments?.value,
                resource.createdAt?.value,
                resource.updatedAt?.value,
                resource.deletedAt?.value,
                
            )
        );
    }

    deleted(resource: AdminResource): void
    {
        this.apply(
            new DeletedResourceEvent(
                resource.id.value,
                resource.boundedContextId.value,
                resource.name.value,
                resource.hasCustomFields.value,
                resource.hasAttachments.value,
                resource.createdAt?.value,
                resource.updatedAt?.value,
                resource.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            boundedContextId: this.boundedContextId.value,
            name: this.name.value,
            hasCustomFields: this.hasCustomFields.value,
            hasAttachments: this.hasAttachments.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
