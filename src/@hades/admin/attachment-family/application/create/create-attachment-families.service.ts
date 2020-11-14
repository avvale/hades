import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
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
} from './../../domain/value-objects';
import { IAttachmentFamilyRepository } from './../../domain/attachment-family.repository';
import { AdminAttachmentFamily } from './../../domain/attachment-family.aggregate';
import { AddAttachmentFamiliesContextEvent } from './../events/add-attachment-families-context.event';

@Injectable()
export class CreateAttachmentFamiliesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAttachmentFamilyRepository,
    ) {}

    public async main(
        attachmentFamilies: {
            id: AttachmentFamilyId,
            name: AttachmentFamilyName,
            resourceIds: AttachmentFamilyResourceIds,
            width: AttachmentFamilyWidth,
            height: AttachmentFamilyHeight,
            fit: AttachmentFamilyFit,
            sizes: AttachmentFamilySizes,
            quality: AttachmentFamilyQuality,
            format: AttachmentFamilyFormat,
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateAttachmentFamilies = attachmentFamilies.map(attachmentFamily => AdminAttachmentFamily.register(
            attachmentFamily.id,
            attachmentFamily.name,
            attachmentFamily.resourceIds,
            attachmentFamily.width,
            attachmentFamily.height,
            attachmentFamily.fit,
            attachmentFamily.sizes,
            attachmentFamily.quality,
            attachmentFamily.format,
            new AttachmentFamilyCreatedAt({currentTimestamp: true}),
            new AttachmentFamilyUpdatedAt({currentTimestamp: true}),
            null
        ));

        // insert
        await this.repository.insert(aggregateAttachmentFamilies);

        // create AddAttachmentFamiliesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const attachmentFamiliesRegistered = this.publisher.mergeObjectContext(new AddAttachmentFamiliesContextEvent(aggregateAttachmentFamilies));

        attachmentFamiliesRegistered.created(); // apply event to model events
        attachmentFamiliesRegistered.commit(); // commit all events of model
    }
}