import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
import {
    AttachmentId,
    AttachmentCommonId,
    AttachmentLangId,
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
} from './../../domain/value-objects';
import { AdminAttachment } from './../../domain/attachment.aggregate';
import { attachments } from './../seeds/attachment.seed';

@Injectable()
export class MockAttachmentSeeder extends MockSeeder<AdminAttachment>
{
    public collectionSource: AdminAttachment[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let attachment of attachments)
        {
            this.collectionSource.push(
                AdminAttachment.register(
                    new AttachmentId(attachment.id),
                    new AttachmentCommonId(attachment.commonId),
                    new AttachmentLangId(attachment.langId),
                    new AttachmentAttachableModel(attachment.attachableModel),
                    new AttachmentAttachableId(attachment.attachableId),
                    new AttachmentFamilyId(attachment.familyId),
                    new AttachmentSort(attachment.sort),
                    new AttachmentAlt(attachment.alt),
                    new AttachmentTitle(attachment.title),
                    new AttachmentDescription(attachment.description),
                    new AttachmentExcerpt(attachment.excerpt),
                    new AttachmentName(attachment.name),
                    new AttachmentPathname(attachment.pathname),
                    new AttachmentFilename(attachment.filename),
                    new AttachmentUrl(attachment.url),
                    new AttachmentMime(attachment.mime),
                    new AttachmentExtension(attachment.extension),
                    new AttachmentSize(attachment.size),
                    new AttachmentWidth(attachment.width),
                    new AttachmentHeight(attachment.height),
                    new AttachmentLibraryId(attachment.libraryId),
                    new AttachmentLibraryFilename(attachment.libraryFilename),
                    new AttachmentData(attachment.data),
                    new AttachmentCreatedAt({currentTimestamp: true}),
                    new AttachmentUpdatedAt({currentTimestamp: true}),
                    new AttachmentDeletedAt(null),
                )
            );
        }
    }
}