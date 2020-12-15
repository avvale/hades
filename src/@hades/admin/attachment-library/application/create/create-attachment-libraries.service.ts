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
import { AddAttachmentLibrariesContextEvent } from './../events/add-attachment-libraries-context.event';

@Injectable()
export class CreateAttachmentLibrariesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAttachmentLibraryRepository,
    ) {}

    public async main(
        attachmentLibraries: {
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
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateAttachmentLibraries = attachmentLibraries.map(attachmentLibrary => AdminAttachmentLibrary.register(
            attachmentLibrary.id,
            attachmentLibrary.name,
            attachmentLibrary.pathname,
            attachmentLibrary.filename,
            attachmentLibrary.url,
            attachmentLibrary.mime,
            attachmentLibrary.extension,
            attachmentLibrary.size,
            attachmentLibrary.width,
            attachmentLibrary.height,
            attachmentLibrary.data,
            new AttachmentLibraryCreatedAt({currentTimestamp: true}),
            new AttachmentLibraryUpdatedAt({currentTimestamp: true}),
            null
        ));

        // insert
        await this.repository.insert(aggregateAttachmentLibraries);

        // create AddAttachmentLibrariesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const attachmentLibrariesRegistered = this.publisher.mergeObjectContext(new AddAttachmentLibrariesContextEvent(aggregateAttachmentLibraries));

        attachmentLibrariesRegistered.created(); // apply event to model events
        attachmentLibrariesRegistered.commit(); // commit all events of model
    }
}