import { AggregateRoot } from '@nestjs/cqrs';
import { AdminAttachmentFamily } from './../../domain/attachment-family.aggregate';
import { CreatedAttachmentFamilyEvent } from './created-attachment-family.event';
import { DeletedAttachmentFamilyEvent } from './deleted-attachment-family.event';
import { CreatedAttachmentFamiliesEvent } from './created-attachment-families.event';
import { DeletedAttachmentFamiliesEvent } from './deleted-attachment-families.event';

export class AddAttachmentFamiliesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AdminAttachmentFamily[] = [],
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
            new CreatedAttachmentFamiliesEvent(
                this.aggregateRoots.map(attachmentFamily =>
                    new CreatedAttachmentFamilyEvent(
                        attachmentFamily.id.value,
                        attachmentFamily.name.value,
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
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedAttachmentFamiliesEvent(
                this.aggregateRoots.map(attachmentFamily =>
                    new DeletedAttachmentFamilyEvent(
                        attachmentFamily.id.value,
                        attachmentFamily.name.value,
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
                )
            )
        );
    }
}