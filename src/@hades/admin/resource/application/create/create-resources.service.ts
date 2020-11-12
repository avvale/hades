import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    ResourceId,
    ResourceBoundedContextId,
    ResourceName,
    ResourceHasCustomFields,
    ResourceHasAttachments,
    ResourceCreatedAt,
    ResourceUpdatedAt,
    ResourceDeletedAt,
} from './../../domain/value-objects';
import { IResourceRepository } from './../../domain/resource.repository';
import { AdminResource } from './../../domain/resource.aggregate';
import { AddResourcesContextEvent } from './../events/add-resources-context.event';

@Injectable()
export class CreateResourcesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IResourceRepository,
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
        // create aggregate with factory pattern
        const aggregateResources = resources.map(resource => AdminResource.register(
            resource.id,
            resource.boundedContextId,
            resource.name,
            resource.hasCustomFields,
            resource.hasAttachments,
            new ResourceCreatedAt({currentTimestamp: true}),
            new ResourceUpdatedAt({currentTimestamp: true}),
            null
        ));

        // insert
        await this.repository.insert(aggregateResources);

        // create AddResourcesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const resourcesRegistered = this.publisher.mergeObjectContext(new AddResourcesContextEvent(aggregateResources));

        resourcesRegistered.created(); // apply event to model events
        resourcesRegistered.commit(); // commit all events of model
    }
}