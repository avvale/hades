import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IAttachmentRepository } from '@hades/admin/attachment/domain/attachment.repository';
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
} from '@hades/admin/attachment/domain/value-objects';
import { AdminAttachment } from './../../domain/attachment.aggregate';
import { attachments } from './../seeds/attachment.seed';

@Injectable()
export class MockAttachmentRepository extends MockRepository<AdminAttachment> implements IAttachmentRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AdminAttachment';
    public collectionSource: AdminAttachment[];
    public deletedAtInstance: AttachmentDeletedAt = new AttachmentDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset()
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>attachments)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AdminAttachment.register(
                    new AttachmentId(itemCollection.id),
                    new AttachmentAttachableModel(itemCollection.attachableModel),
                    new AttachmentAttachableId(itemCollection.attachableId),
                    new AttachmentFamilyId(itemCollection.familyId),
                    new AttachmentSort(itemCollection.sort),
                    new AttachmentAlt(itemCollection.alt),
                    new AttachmentTitle(itemCollection.title),
                    new AttachmentDescription(itemCollection.description),
                    new AttachmentExcerpt(itemCollection.excerpt),
                    new AttachmentName(itemCollection.name),
                    new AttachmentPathname(itemCollection.pathname),
                    new AttachmentFilename(itemCollection.filename),
                    new AttachmentUrl(itemCollection.url),
                    new AttachmentMime(itemCollection.mime),
                    new AttachmentExtension(itemCollection.extension),
                    new AttachmentSize(itemCollection.size),
                    new AttachmentWidth(itemCollection.width),
                    new AttachmentHeight(itemCollection.height),
                    new AttachmentLibraryId(itemCollection.libraryId),
                    new AttachmentLibraryFilename(itemCollection.libraryFilename),
                    new AttachmentData(itemCollection.data),
                    new AttachmentCreatedAt(itemCollection.createdAt),
                    new AttachmentUpdatedAt(itemCollection.updatedAt),
                    new AttachmentDeletedAt(itemCollection.deletedAt),
                ));
        }
    }
}