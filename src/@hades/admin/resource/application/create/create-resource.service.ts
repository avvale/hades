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
export class CreateResourceService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IResourceRepository
    ) {}

    public async main(
        id: ResourceId,
        boundedContextId: ResourceBoundedContextId,
        name: ResourceName,
        hasCustomFields: ResourceHasCustomFields,
        hasAttachments: ResourceHasAttachments,
        
    ): Promise<void>
    {
        // create object with factory pattern
        const resource = AdminResource.register(
            id,
            boundedContextId,
            name,
            hasCustomFields,
            hasAttachments,
            new ResourceCreatedAt(Utils.nowTimestamp()),
            new ResourceUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // create
        await this.repository.create(resource);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const resourceRegister = this.publisher.mergeObjectContext(
            resource
        );
        
        resourceRegister.created(resource); // apply event to model events
        resourceRegister.commit(); // commit all events of model
    }
}