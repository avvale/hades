import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    ResourceId,
    ResourceBoundedContextId,
    ResourceAttachmentFamilyIds,
    ResourceName,
    ResourceHasCustomFields,
    ResourceHasAttachments,
    ResourceCreatedAt,
    ResourceUpdatedAt,
    ResourceDeletedAt,
} from './../../domain/value-objects';
import { IResourceRepository } from './../../domain/resource.repository';
import { AdminResource } from './../../domain/resource.aggregate';

@Injectable()
export class CreateResourceService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IResourceRepository,
    ) {}

    public async main(
        payload: {
            id: ResourceId,
            boundedContextId: ResourceBoundedContextId,
            attachmentFamilyIds: ResourceAttachmentFamilyIds,
            name: ResourceName,
            hasCustomFields: ResourceHasCustomFields,
            hasAttachments: ResourceHasAttachments,
        }
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const resource = AdminResource.register(
            payload.id,
            payload.boundedContextId,
            payload.attachmentFamilyIds,
            payload.name,
            payload.hasCustomFields,
            payload.hasAttachments,
            new ResourceCreatedAt({currentTimestamp: true}),
            new ResourceUpdatedAt({currentTimestamp: true}),
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