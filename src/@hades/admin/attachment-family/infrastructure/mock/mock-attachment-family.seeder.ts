import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
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
} from './../../domain/value-objects';
import { AdminAttachmentFamily } from './../../domain/attachment-family.aggregate';
import { attachmentFamilies } from './../seeds/attachment-family.seed';

@Injectable()
export class MockAttachmentFamilySeeder extends MockSeeder<AdminAttachmentFamily>
{
    public collectionSource: AdminAttachmentFamily[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let attachmentFamily of attachmentFamilies)
        {
            this.collectionSource.push(
                AdminAttachmentFamily.register(
                    new AttachmentFamilyId(attachmentFamily.id),
                    new AttachmentFamilyName(attachmentFamily.name),
                    new AttachmentFamilyResourceIds(attachmentFamily.resourceIds),
                    new AttachmentFamilyWidth(attachmentFamily.width),
                    new AttachmentFamilyHeight(attachmentFamily.height),
                    new AttachmentFamilyFit(attachmentFamily.fit),
                    new AttachmentFamilySizes(attachmentFamily.sizes),
                    new AttachmentFamilyQuality(attachmentFamily.quality),
                    new AttachmentFamilyFormat(attachmentFamily.format),
                    new AttachmentFamilyCreatedAt({currentTimestamp: true}),
                    new AttachmentFamilyUpdatedAt({currentTimestamp: true}),
                    new AttachmentFamilyDeletedAt(null),
                )
            );
        }
    }
}