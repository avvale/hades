import { AggregateRoot } from '@nestjs/cqrs';
import {
    AttachmentFamilyId,
    AttachmentFamilyName,
    AttachmentFamilyResourceIds,
    AttachmentFamilyWidth,
    AttachmentFamilyHeight,
    AttachmentFamilyFit,
    AttachmentFamilySizes,
    AttachmentFamilyQuality,
    AttachmentFamilyFormat,
    AttachmentFamilyCreatedAt,
    AttachmentFamilyUpdatedAt,
    AttachmentFamilyDeletedAt,
} from './value-objects';
import { CreatedAttachmentFamilyEvent } from './../application/events/created-attachment-family.event';
import { UpdatedAttachmentFamilyEvent } from './../application/events/updated-attachment-family.event';
import { DeletedAttachmentFamilyEvent } from './../application/events/deleted-attachment-family.event';
import { AdminResource } from '@hades/admin/resource/domain/resource.aggregate';

export class AdminAttachmentFamily extends AggregateRoot
{
    id: AttachmentFamilyId;
    name: AttachmentFamilyName;
    resourceIds: AttachmentFamilyResourceIds;
    width: AttachmentFamilyWidth;
    height: AttachmentFamilyHeight;
    fit: AttachmentFamilyFit;
    sizes: AttachmentFamilySizes;
    quality: AttachmentFamilyQuality;
    format: AttachmentFamilyFormat;
    createdAt: AttachmentFamilyCreatedAt;
    updatedAt: AttachmentFamilyUpdatedAt;
    deletedAt: AttachmentFamilyDeletedAt;

    // eager relationship
    resources: AdminResource[];

    constructor(
        id: AttachmentFamilyId,
        name: AttachmentFamilyName,
        resourceIds: AttachmentFamilyResourceIds,
        width: AttachmentFamilyWidth,
        height: AttachmentFamilyHeight,
        fit: AttachmentFamilyFit,
        sizes: AttachmentFamilySizes,
        quality: AttachmentFamilyQuality,
        format: AttachmentFamilyFormat,
        createdAt: AttachmentFamilyCreatedAt,
        updatedAt: AttachmentFamilyUpdatedAt,
        deletedAt: AttachmentFamilyDeletedAt,
        resources?: AdminResource[],
    )
    {
        super();

        this.id = id;
        this.name = name;
        this.resourceIds = resourceIds;
        this.width = width;
        this.height = height;
        this.fit = fit;
        this.sizes = sizes;
        this.quality = quality;
        this.format = format;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.resources = resources;
    }

    static register (
        id: AttachmentFamilyId,
        name: AttachmentFamilyName,
        resourceIds: AttachmentFamilyResourceIds,
        width: AttachmentFamilyWidth,
        height: AttachmentFamilyHeight,
        fit: AttachmentFamilyFit,
        sizes: AttachmentFamilySizes,
        quality: AttachmentFamilyQuality,
        format: AttachmentFamilyFormat,
        createdAt: AttachmentFamilyCreatedAt,
        updatedAt: AttachmentFamilyUpdatedAt,
        deletedAt: AttachmentFamilyDeletedAt,
        resources?: AdminResource[],
    ): AdminAttachmentFamily
    {
        return new AdminAttachmentFamily(
            id,
            name,
            resourceIds,
            width,
            height,
            fit,
            sizes,
            quality,
            format,
            createdAt,
            updatedAt,
            deletedAt,
            resources,
        );
    }

    created(attachmentFamily: AdminAttachmentFamily): void
    {
        this.apply(
            new CreatedAttachmentFamilyEvent(
                attachmentFamily.id.value,
                attachmentFamily.name.value,
                attachmentFamily.resourceIds?.value,
                attachmentFamily.width?.value,
                attachmentFamily.height?.value,
                attachmentFamily.fit.value,
                attachmentFamily.sizes?.value,
                attachmentFamily.quality?.value,
                attachmentFamily.format?.value,
                attachmentFamily.createdAt?.value,
                attachmentFamily.updatedAt?.value,
                attachmentFamily.deletedAt?.value,
            )
        );
    }

    updated(attachmentFamily: AdminAttachmentFamily): void
    {
        this.apply(
            new UpdatedAttachmentFamilyEvent(
                attachmentFamily.id.value,
                attachmentFamily.name?.value,
                attachmentFamily.resourceIds?.value,
                attachmentFamily.width?.value,
                attachmentFamily.height?.value,
                attachmentFamily.fit?.value,
                attachmentFamily.sizes?.value,
                attachmentFamily.quality?.value,
                attachmentFamily.format?.value,
                attachmentFamily.createdAt?.value,
                attachmentFamily.updatedAt?.value,
                attachmentFamily.deletedAt?.value,
            )
        );
    }

    deleted(attachmentFamily: AdminAttachmentFamily): void
    {
        this.apply(
            new DeletedAttachmentFamilyEvent(
                attachmentFamily.id.value,
                attachmentFamily.name.value,
                attachmentFamily.resourceIds?.value,
                attachmentFamily.width?.value,
                attachmentFamily.height?.value,
                attachmentFamily.fit.value,
                attachmentFamily.sizes?.value,
                attachmentFamily.quality?.value,
                attachmentFamily.format?.value,
                attachmentFamily.createdAt?.value,
                attachmentFamily.updatedAt?.value,
                attachmentFamily.deletedAt?.value,
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            name: this.name.value,
            resourceIds: this.resourceIds?.value,
            width: this.width?.value,
            height: this.height?.value,
            fit: this.fit.value,
            sizes: this.sizes?.value,
            quality: this.quality?.value,
            format: this.format?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            resources: this.resources?.map(item => item.toDTO()),
        }
    }
}
