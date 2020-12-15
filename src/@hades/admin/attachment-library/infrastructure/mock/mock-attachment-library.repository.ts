import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IAttachmentLibraryRepository } from '@hades/admin/attachment-library/domain/attachment-library.repository';
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
} from '@hades/admin/attachment-library/domain/value-objects';
import { AdminAttachmentLibrary } from './../../domain/attachment-library.aggregate';
import { attachmentLibrary } from './../seeds/attachment-library.seed';

@Injectable()
export class MockAttachmentLibraryRepository extends MockRepository<AdminAttachmentLibrary> implements IAttachmentLibraryRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AdminAttachmentLibrary';
    public collectionSource: AdminAttachmentLibrary[];
    public deletedAtInstance: AttachmentLibraryDeletedAt = new AttachmentLibraryDeletedAt(null);

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

        for (const itemCollection of <any[]>attachmentLibrary)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AdminAttachmentLibrary.register(
                    new AttachmentLibraryId(itemCollection.id),
                    new AttachmentLibraryName(itemCollection.name),
                    new AttachmentLibraryPathname(itemCollection.pathname),
                    new AttachmentLibraryFilename(itemCollection.filename),
                    new AttachmentLibraryUrl(itemCollection.url),
                    new AttachmentLibraryMime(itemCollection.mime),
                    new AttachmentLibraryExtension(itemCollection.extension),
                    new AttachmentLibrarySize(itemCollection.size),
                    new AttachmentLibraryWidth(itemCollection.width),
                    new AttachmentLibraryHeight(itemCollection.height),
                    new AttachmentLibraryData(itemCollection.data),
                    new AttachmentLibraryCreatedAt(itemCollection.createdAt),
                    new AttachmentLibraryUpdatedAt(itemCollection.updatedAt),
                    new AttachmentLibraryDeletedAt(itemCollection.deletedAt),
                ));
        }
    }
}