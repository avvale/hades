import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
import { IResourceRepository } from './../../domain/resource.repository';
import { AdminResource } from './../../domain/resource.aggregate';

@Injectable()
export class UpdateResourceService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IResourceRepository
    ) {}

    public async main(
        id: ResourceId,
        boundedContextId?: ResourceBoundedContextId,
        name?: ResourceName,
        hasCustomFields?: ResourceHasCustomFields,
        hasAttachments?: ResourceHasAttachments,
        
    ): Promise<void>
    {        
        // create object with factory pattern
        const resource = AdminResource.register(
            id,
            boundedContextId,
            name,
            hasCustomFields,
            hasAttachments,
            null,
            new ResourceUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(resource);        
            
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        const resourceRegister = this.publisher.mergeObjectContext(
            await this.repository.findById(id)
        );
        
        resourceRegister.updated(resource); // apply event to model events
        resourceRegister.commit(); // commit all events of model
    }
}