import { AggregateRoot } from '@nestjs/cqrs';
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
} from './value-objects';
import { CreatedAttachmentLibraryEvent } from './../application/events/created-attachment-library.event';
import { UpdatedAttachmentLibraryEvent } from './../application/events/updated-attachment-library.event';
import { DeletedAttachmentLibraryEvent } from './../application/events/deleted-attachment-library.event';

export class AdminAttachmentLibrary extends AggregateRoot
{
    id: AttachmentLibraryId;
    name: AttachmentLibraryName;
    pathname: AttachmentLibraryPathname;
    filename: AttachmentLibraryFilename;
    url: AttachmentLibraryUrl;
    mime: AttachmentLibraryMime;
    extension: AttachmentLibraryExtension;
    size: AttachmentLibrarySize;
    width: AttachmentLibraryWidth;
    height: AttachmentLibraryHeight;
    data: AttachmentLibraryData;
    createdAt: AttachmentLibraryCreatedAt;
    updatedAt: AttachmentLibraryUpdatedAt;
    deletedAt: AttachmentLibraryDeletedAt;

    // eager relationship

    constructor(
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
        createdAt: AttachmentLibraryCreatedAt,
        updatedAt: AttachmentLibraryUpdatedAt,
        deletedAt: AttachmentLibraryDeletedAt,
    )
    {
        super();

        this.id = id;
        this.name = name;
        this.pathname = pathname;
        this.filename = filename;
        this.url = url;
        this.mime = mime;
        this.extension = extension;
        this.size = size;
        this.width = width;
        this.height = height;
        this.data = data;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
    }

    static register (
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
        createdAt: AttachmentLibraryCreatedAt,
        updatedAt: AttachmentLibraryUpdatedAt,
        deletedAt: AttachmentLibraryDeletedAt,
    ): AdminAttachmentLibrary
    {
        return new AdminAttachmentLibrary(
            id,
            name,
            pathname,
            filename,
            url,
            mime,
            extension,
            size,
            width,
            height,
            data,
            createdAt,
            updatedAt,
            deletedAt,
        );
    }

    created(attachmentLibrary: AdminAttachmentLibrary): void
    {
        this.apply(
            new CreatedAttachmentLibraryEvent(
                attachmentLibrary.id.value,
                attachmentLibrary.name?.value,
                attachmentLibrary.pathname.value,
                attachmentLibrary.filename.value,
                attachmentLibrary.url.value,
                attachmentLibrary.mime.value,
                attachmentLibrary.extension?.value,
                attachmentLibrary.size.value,
                attachmentLibrary.width?.value,
                attachmentLibrary.height?.value,
                attachmentLibrary.data?.value,
                attachmentLibrary.createdAt?.value,
                attachmentLibrary.updatedAt?.value,
                attachmentLibrary.deletedAt?.value,
            )
        );
    }

    updated(attachmentLibrary: AdminAttachmentLibrary): void
    {
        this.apply(
            new UpdatedAttachmentLibraryEvent(
                attachmentLibrary.id.value,
                attachmentLibrary.name?.value,
                attachmentLibrary.pathname?.value,
                attachmentLibrary.filename?.value,
                attachmentLibrary.url?.value,
                attachmentLibrary.mime?.value,
                attachmentLibrary.extension?.value,
                attachmentLibrary.size?.value,
                attachmentLibrary.width?.value,
                attachmentLibrary.height?.value,
                attachmentLibrary.data?.value,
                attachmentLibrary.createdAt?.value,
                attachmentLibrary.updatedAt?.value,
                attachmentLibrary.deletedAt?.value,
            )
        );
    }

    deleted(attachmentLibrary: AdminAttachmentLibrary): void
    {
        this.apply(
            new DeletedAttachmentLibraryEvent(
                attachmentLibrary.id.value,
                attachmentLibrary.name?.value,
                attachmentLibrary.pathname.value,
                attachmentLibrary.filename.value,
                attachmentLibrary.url.value,
                attachmentLibrary.mime.value,
                attachmentLibrary.extension?.value,
                attachmentLibrary.size.value,
                attachmentLibrary.width?.value,
                attachmentLibrary.height?.value,
                attachmentLibrary.data?.value,
                attachmentLibrary.createdAt?.value,
                attachmentLibrary.updatedAt?.value,
                attachmentLibrary.deletedAt?.value,
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            name: this.name?.value,
            pathname: this.pathname.value,
            filename: this.filename.value,
            url: this.url.value,
            mime: this.mime.value,
            extension: this.extension?.value,
            size: this.size.value,
            width: this.width?.value,
            height: this.height?.value,
            data: this.data?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        }
    }
}
