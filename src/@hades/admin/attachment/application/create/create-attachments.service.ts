import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    AttachmentId,
    AttachmentCommonId,
    AttachmentLangId,
    AttachmentAttachableModel,
    AttachmentAttachableId,
    AttachmentFamilyId,
    AttachmentSort,
    AttachmentAlt,
    AttachmentTitle,
    AttachmentDescription,
    AttachmentExcerpt,
    AttachmentPathname,
    AttachmentFilename,
    AttachmentUrl,
    AttachmentMime,
    AttachmentExtension,
    AttachmentSize,
    AttachmentWidth,
    AttachmentHeight,
    AttachmentLibraryId,
    AttachmentLibraryFilename,
    AttachmentData,
    AttachmentCreatedAt,
    AttachmentUpdatedAt,
    AttachmentDeletedAt,
} from './../../domain/value-objects';
import { IAttachmentRepository } from './../../domain/attachment.repository';
import { AdminAttachment } from './../../domain/attachment.aggregate';
import { AddAttachmentsContextEvent } from './../events/add-attachments-context.event';

@Injectable()
export class CreateAttachmentsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAttachmentRepository,
    ) {}

    public async main(
        attachments: {
            id: AttachmentId,
            commonId: AttachmentCommonId,
            langId: AttachmentLangId,
            attachableModel: AttachmentAttachableModel,
            attachableId: AttachmentAttachableId,
            familyId: AttachmentFamilyId,
            sort: AttachmentSort,
            alt: AttachmentAlt,
            title: AttachmentTitle,
            description: AttachmentDescription,
            excerpt: AttachmentExcerpt,
            pathname: AttachmentPathname,
            filename: AttachmentFilename,
            url: AttachmentUrl,
            mime: AttachmentMime,
            extension: AttachmentExtension,
            size: AttachmentSize,
            width: AttachmentWidth,
            height: AttachmentHeight,
            libraryId: AttachmentLibraryId,
            libraryFilename: AttachmentLibraryFilename,
            data: AttachmentData,
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateAttachments = attachments.map(attachment => AdminAttachment.register(
            attachment.id,
            attachment.commonId,
            attachment.langId,
            attachment.attachableModel,
            attachment.attachableId,
            attachment.familyId,
            attachment.sort,
            attachment.alt,
            attachment.title,
            attachment.description,
            attachment.excerpt,
            attachment.pathname,
            attachment.filename,
            attachment.url,
            attachment.mime,
            attachment.extension,
            attachment.size,
            attachment.width,
            attachment.height,
            attachment.libraryId,
            attachment.libraryFilename,
            attachment.data,
            new AttachmentCreatedAt({currentTimestamp: true}),
            new AttachmentUpdatedAt({currentTimestamp: true}),
            null
        ));

        // insert
        await this.repository.insert(aggregateAttachments);

        // create AddAttachmentsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const attachmentsRegistered = this.publisher.mergeObjectContext(new AddAttachmentsContextEvent(aggregateAttachments));

        attachmentsRegistered.created(); // apply event to model events
        attachmentsRegistered.commit(); // commit all events of model
    }
}