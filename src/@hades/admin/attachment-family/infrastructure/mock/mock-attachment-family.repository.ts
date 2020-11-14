import { Injectable} from '@nestjs/common';
import { MockRepository } from '@hades/shared/infrastructure/persistence/mock/mock.repository';
import { Utils } from '@hades/shared/domain/lib/utils';
import { IAttachmentFamilyRepository } from '@hades/admin/attachment-family/domain/attachment-family.repository';
import {
    AttachmentFamilyId,
    AttachmentFamilyName,
    AttachmentFamilyResourceIds,
    AttachmentFamilyWidth,
    AttachmentFamilyHeight,
    AttachmentFamilyFit,
    AttachmentFamilySizes,
    AttachmentFamilyQuality,
    AttachmentFamilyFormat,
    AttachmentFamilyCreatedAt,
    AttachmentFamilyUpdatedAt,
    AttachmentFamilyDeletedAt,
} from '@hades/admin/attachment-family/domain/value-objects';
import { AdminAttachmentFamily } from './../../domain/attachment-family.aggregate';
import { attachmentFamilies } from './../seeds/attachment-family.seed';

@Injectable()
export class MockAttachmentFamilyRepository extends MockRepository<AdminAttachmentFamily> implements IAttachmentFamilyRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AdminAttachmentFamily';
    public collectionSource: AdminAttachmentFamily[];
    public deletedAtInstance: AttachmentFamilyDeletedAt = new AttachmentFamilyDeletedAt(null);

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

        for (const itemCollection of <any[]>attachmentFamilies)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AdminAttachmentFamily.register(
                    new AttachmentFamilyId(itemCollection.id),
                    new AttachmentFamilyName(itemCollection.name),
                    new AttachmentFamilyResourceIds(itemCollection.resourceIds),
                    new AttachmentFamilyWidth(itemCollection.width),
                    new AttachmentFamilyHeight(itemCollection.height),
                    new AttachmentFamilyFit(itemCollection.fit),
                    new AttachmentFamilySizes(itemCollection.sizes),
                    new AttachmentFamilyQuality(itemCollection.quality),
                    new AttachmentFamilyFormat(itemCollection.format),
                    new AttachmentFamilyCreatedAt(itemCollection.createdAt),
                    new AttachmentFamilyUpdatedAt(itemCollection.updatedAt),
                    new AttachmentFamilyDeletedAt(itemCollection.deletedAt),
                ));
        }
    }
}