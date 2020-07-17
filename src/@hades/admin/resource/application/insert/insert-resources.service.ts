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
export class InsertResourcesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IResourceRepository
    ) {}

    public async main(
        resources: {
            id: ResourceId,
            boundedContextId: ResourceBoundedContextId,
            name: ResourceName,
            hasCustomFields: ResourceHasCustomFields,
            hasAttachments: ResourceHasAttachments,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateResources = resources.map(resource => AdminResource.register(
            resource.id,
            resource.boundedContextId,
            resource.name,
            resource.hasCustomFields,
            resource.hasAttachments,
            new ResourceCreatedAt(Utils.nowTimestamp()),
            new ResourceUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateResources);

        // TODO a falta de definir eventos
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        // const resourcesRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id) // there may be cases where the database object is direct to the command, for example in the update, only one field can be updated
        // );
        // 
        // resourcesRegistered.created(resources); // apply event to model events
        // resourcesRegistered.commit(); // commit all events of model
    }
}