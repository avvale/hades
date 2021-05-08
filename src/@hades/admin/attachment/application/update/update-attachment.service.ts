import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import {
    AttachmentId,
    AttachmentAttachableModel,
    AttachmentAttachableId,
    AttachmentFamilyId,
    AttachmentSort,
    AttachmentAlt,
    AttachmentTitle,
    AttachmentDescription,
    AttachmentExcerpt,
    AttachmentName,
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
export class UpdateAttachmentService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAttachmentRepository,
    ) {}

    public async main(
        payload: {
            id: AttachmentId,
            attachableModel?: AttachmentAttachableModel,
            attachableId?: AttachmentAttachableId,
            familyId?: AttachmentFamilyId,
            sort?: AttachmentSort,
            alt?: AttachmentAlt,
            title?: AttachmentTitle,
            description?: AttachmentDescription,
            excerpt?: AttachmentExcerpt,
            name?: AttachmentName,
            pathname?: AttachmentPathname,
            filename?: AttachmentFilename,
            url?: AttachmentUrl,
            mime?: AttachmentMime,
            extension?: AttachmentExtension,
            size?: AttachmentSize,
            width?: AttachmentWidth,
            height?: AttachmentHeight,
            libraryId?: AttachmentLibraryId,
            libraryFilename?: AttachmentLibraryFilename,
            data?: AttachmentData,
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const attachment = AdminAttachment.register(
            payload.id,
            payload.attachableModel,
            payload.attachableId,
            payload.familyId,
            payload.sort,
            payload.alt,
            payload.title,
            payload.description,
            payload.excerpt,
            payload.name,
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
            null,
            new AttachmentUpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update(attachment, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const attachmentRegister = this.publisher.mergeObjectContext(
            attachment
        );

        attachmentRegister.updated(attachment); // apply event to model events
        attachmentRegister.commit(); // commit all events of model
    }
}