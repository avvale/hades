import { AggregateRoot } from '@nestjs/cqrs';
import { AdminAttachment } from './../../domain/attachment.aggregate';
import { CreatedAttachmentEvent } from './created-attachment.event';
import { DeletedAttachmentEvent } from './deleted-attachment.event';
import { CreatedAttachmentsEvent } from './created-attachments.event';
import { DeletedAttachmentsEvent } from './deleted-attachments.event';

export class AddAttachmentsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AdminAttachment[] = [],
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
            new CreatedAttachmentsEvent(
                this.aggregateRoots.map(attachment =>
                    new CreatedAttachmentEvent(
                        attachment.id.value,
                        attachment.commonId.value,
                        attachment.langId.value,
                        attachment.attachableModel.value,
                        attachment.attachableId.value,
                        attachment.familyId?.value,
                        attachment.sort?.value,
                        attachment.alt?.value,
                        attachment.title?.value,
                        attachment.description?.value,
                        attachment.excerpt?.value,
                        attachment.name.value,
                        attachment.pathname.value,
                        attachment.filename.value,
                        attachment.url.value,
                        attachment.mime.value,
                        attachment.extension?.value,
                        attachment.size.value,
                        attachment.width?.value,
                        attachment.height?.value,
                        attachment.libraryId?.value,
                        attachment.libraryFilename?.value,
                        attachment.data?.value,
                        attachment.createdAt?.value,
                        attachment.updatedAt?.value,
                        attachment.deletedAt?.value,
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedAttachmentsEvent(
                this.aggregateRoots.map(attachment =>
                    new DeletedAttachmentEvent(
                        attachment.id.value,
                        attachment.commonId.value,
                        attachment.langId.value,
                        attachment.attachableModel.value,
                        attachment.attachableId.value,
                        attachment.familyId?.value,
                        attachment.sort?.value,
                        attachment.alt?.value,
                        attachment.title?.value,
                        attachment.description?.value,
                        attachment.excerpt?.value,
                        attachment.name.value,
                        attachment.pathname.value,
                        attachment.filename.value,
                        attachment.url.value,
                        attachment.mime.value,
                        attachment.extension?.value,
                        attachment.size.value,
                        attachment.width?.value,
                        attachment.height?.value,
                        attachment.libraryId?.value,
                        attachment.libraryFilename?.value,
                        attachment.data?.value,
                        attachment.createdAt?.value,
                        attachment.updatedAt?.value,
                        attachment.deletedAt?.value,
                    )
                )
            )
        );
    }
}