import { AggregateRoot } from '@nestjs/cqrs';
import { AdminResource } from './../../domain/resource.aggregate';
import { CreatedResourceEvent } from './created-resource.event';
import { DeletedResourceEvent } from './deleted-resource.event';
import { CreatedResourcesEvent } from './created-resources.event';
import { DeletedResourcesEvent } from './deleted-resources.event';

export class AddResourcesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AdminResource[] = [],
    ) {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created()
    {
        this.apply(
            new CreatedResourcesEvent(
                this.aggregateRoots.map(resource =>
                    new CreatedResourceEvent(
                        resource.id.value,
                        resource.boundedContextId.value,
                        resource.attachmentFamilyIds?.value,
                        resource.name.value,
                        resource.hasCustomFields.value,
                        resource.hasAttachments.value,
                        resource.createdAt?.value,
                        resource.updatedAt?.value,
                        resource.deletedAt?.value,
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedResourcesEvent(
                this.aggregateRoots.map(resource =>
                    new DeletedResourceEvent(
                        resource.id.value,
                        resource.boundedContextId.value,
                        resource.attachmentFamilyIds?.value,
                        resource.name.value,
                        resource.hasCustomFields.value,
                        resource.hasAttachments.value,
                        resource.createdAt?.value,
                        resource.updatedAt?.value,
                        resource.deletedAt?.value,
                    )
                )
            )
        );
    }
}