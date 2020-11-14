import { AggregateRoot } from '@nestjs/cqrs';
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
} from './value-objects';
import { CreatedResourceEvent } from './../application/events/created-resource.event';
import { UpdatedResourceEvent } from './../application/events/updated-resource.event';
import { DeletedResourceEvent } from './../application/events/deleted-resource.event';
import { IamBoundedContext } from '@hades/iam/bounded-context/domain/bounded-context.aggregate';
import { IamAttachmentFamily } from '@hades/iam/attachment-family/domain/attachment-family.aggregate';

export class AdminResource extends AggregateRoot
{
    id: ResourceId;
    boundedContextId: ResourceBoundedContextId;
    attachmentFamilyIds: ResourceAttachmentFamilyIds;
    name: ResourceName;
    hasCustomFields: ResourceHasCustomFields;
    hasAttachments: ResourceHasAttachments;
    createdAt: ResourceCreatedAt;
    updatedAt: ResourceUpdatedAt;
    deletedAt: ResourceDeletedAt;

    // eager relationship
    boundedContext: IamBoundedContext;
    attachmentFamilies: IamAttachmentFamily[];

    constructor(
        id: ResourceId,
        boundedContextId: ResourceBoundedContextId,
        attachmentFamilyIds: ResourceAttachmentFamilyIds,
        name: ResourceName,
        hasCustomFields: ResourceHasCustomFields,
        hasAttachments: ResourceHasAttachments,
        createdAt: ResourceCreatedAt,
        updatedAt: ResourceUpdatedAt,
        deletedAt: ResourceDeletedAt,
        boundedContext?: IamBoundedContext,
        attachmentFamilies?: IamAttachmentFamily[],
    )
    {
        super();

        this.id = id;
        this.boundedContextId = boundedContextId;
        this.attachmentFamilyIds = attachmentFamilyIds;
        this.name = name;
        this.hasCustomFields = hasCustomFields;
        this.hasAttachments = hasAttachments;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.boundedContext = boundedContext;
        this.attachmentFamilies = attachmentFamilies;
    }

    static register (
        id: ResourceId,
        boundedContextId: ResourceBoundedContextId,
        attachmentFamilyIds: ResourceAttachmentFamilyIds,
        name: ResourceName,
        hasCustomFields: ResourceHasCustomFields,
        hasAttachments: ResourceHasAttachments,
        createdAt: ResourceCreatedAt,
        updatedAt: ResourceUpdatedAt,
        deletedAt: ResourceDeletedAt,
        boundedContext?: IamBoundedContext,
        attachmentFamilies?: IamAttachmentFamily[],
    ): AdminResource
    {
        return new AdminResource(
            id,
            boundedContextId,
            attachmentFamilyIds,
            name,
            hasCustomFields,
            hasAttachments,
            createdAt,
            updatedAt,
            deletedAt,
            boundedContext,
            attachmentFamilies,
        );
    }

    created(resource: AdminResource): void
    {
        this.apply(
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
        );
    }

    updated(resource: AdminResource): void
    {
        this.apply(
            new UpdatedResourceEvent(
                resource.id.value,
                resource.boundedContextId?.value,
                resource.attachmentFamilyIds?.value,
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
                resource.attachmentFamilyIds?.value,
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
            attachmentFamilyIds: this.attachmentFamilyIds?.value,
            name: this.name.value,
            hasCustomFields: this.hasCustomFields.value,
            hasAttachments: this.hasAttachments.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            boundedContext: this.boundedContext?.toDTO(),
            attachmentFamilies: this.attachmentFamilies?.map(item => item.toDTO()),
        }
    }
}
