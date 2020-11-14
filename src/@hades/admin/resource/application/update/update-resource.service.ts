import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
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
export class UpdateResourceService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IResourceRepository,
    ) {}

    public async main(
        payload: {
            id: ResourceId,
            boundedContextId?: ResourceBoundedContextId,
            attachmentFamilyIds?: ResourceAttachmentFamilyIds,
            name?: ResourceName,
            hasCustomFields?: ResourceHasCustomFields,
            hasAttachments?: ResourceHasAttachments,
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
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
            null,
            new ResourceUpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update(resource, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const resourceRegister = this.publisher.mergeObjectContext(
            resource
        );

        resourceRegister.updated(resource); // apply event to model events
        resourceRegister.commit(); // commit all events of model
    }
}