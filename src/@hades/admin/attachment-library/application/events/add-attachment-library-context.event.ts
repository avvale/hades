import { AggregateRoot } from '@nestjs/cqrs';
import { AdminAttachmentLibrary } from './../../domain/attachment-library.aggregate';
import { CreatedAttachmentLibraryEvent } from './created-attachment-library.event';
import { DeletedAttachmentLibraryEvent } from './deleted-attachment-library.event';
import { CreatedAttachmentLibraryEvent } from './created-attachment-library.event';
import { DeletedAttachmentLibraryEvent } from './deleted-attachment-library.event';

export class AddAttachmentLibraryContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AdminAttachmentLibrary[] = [],
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
            new CreatedAttachmentLibraryEvent(
                this.aggregateRoots.map(attachmentLibrary =>
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
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedAttachmentLibraryEvent(
                this.aggregateRoots.map(attachmentLibrary =>
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
                )
            )
        );
    }
}