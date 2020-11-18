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

@Injectable()
export class CreateAttachmentService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAttachmentRepository,
    ) {}

    public async main(
        payload: {
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
        }
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const attachment = AdminAttachment.register(
            payload.id,
            payload.commonId,
            payload.langId,
            payload.attachableModel,
            payload.attachableId,
            payload.familyId,
            payload.sort,
            payload.alt,
            payload.title,
            payload.description,
            payload.excerpt,
            payload.pathname,
            payload.filename,
            payload.url,
            payload.mime,
            payload.extension,
            payload.size,
            payload.width,
            payload.height,
            payload.libraryId,
            payload.libraryFilename,
            payload.data,
            new AttachmentCreatedAt({currentTimestamp: true}),
            new AttachmentUpdatedAt({currentTimestamp: true}),
            null
        );

        // create
        await this.repository.create(attachment);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const attachmentRegister = this.publisher.mergeObjectContext(
            attachment
        );

        attachmentRegister.created(attachment); // apply event to model events
        attachmentRegister.commit(); // commit all events of model
    }
}