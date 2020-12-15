import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    AttachmentLibraryId,
    AttachmentLibraryName,
    AttachmentLibraryPathname,
    AttachmentLibraryFilename,
    AttachmentLibraryUrl,
    AttachmentLibraryMime,
    AttachmentLibraryExtension,
    AttachmentLibrarySize,
    AttachmentLibraryWidth,
    AttachmentLibraryHeight,
    AttachmentLibraryData,
    AttachmentLibraryCreatedAt,
    AttachmentLibraryUpdatedAt,
    AttachmentLibraryDeletedAt,
} from './../../domain/value-objects';
import { IAttachmentLibraryRepository } from './../../domain/attachment-library.repository';
import { AdminAttachmentLibrary } from './../../domain/attachment-library.aggregate';

@Injectable()
export class CreateAttachmentLibraryService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAttachmentLibraryRepository,
    ) {}

    public async main(
        payload: {
            id: AttachmentLibraryId,
            name: AttachmentLibraryName,
            pathname: AttachmentLibraryPathname,
            filename: AttachmentLibraryFilename,
            url: AttachmentLibraryUrl,
            mime: AttachmentLibraryMime,
            extension: AttachmentLibraryExtension,
            size: AttachmentLibrarySize,
            width: AttachmentLibraryWidth,
            height: AttachmentLibraryHeight,
            data: AttachmentLibraryData,
        }
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const attachmentLibrary = AdminAttachmentLibrary.register(
            payload.id,
            payload.name,
            payload.pathname,
            payload.filename,
            payload.url,
            payload.mime,
            payload.extension,
            payload.size,
            payload.width,
            payload.height,
            payload.data,
            new AttachmentLibraryCreatedAt({currentTimestamp: true}),
            new AttachmentLibraryUpdatedAt({currentTimestamp: true}),
            null
        );

        // create
        await this.repository.create(attachmentLibrary);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const attachmentLibraryRegister = this.publisher.mergeObjectContext(
            attachmentLibrary
        );

        attachmentLibraryRegister.created(attachmentLibrary); // apply event to model events
        attachmentLibraryRegister.commit(); // commit all events of model
    }
}