import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
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
import { AdminAttachmentLibrary } from './../../domain/attachment-library.aggregate';
import { attachmentLibraries } from './../seeds/attachment-library.seed';

@Injectable()
export class MockAttachmentLibrarySeeder extends MockSeeder<AdminAttachmentLibrary>
{
    public collectionSource: AdminAttachmentLibrary[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let attachmentLibrary of attachmentLibraries)
        {
            this.collectionSource.push(
                AdminAttachmentLibrary.register(
                    new AttachmentLibraryId(attachmentLibrary.id),
                    new AttachmentLibraryName(attachmentLibrary.name),
                    new AttachmentLibraryPathname(attachmentLibrary.pathname),
                    new AttachmentLibraryFilename(attachmentLibrary.filename),
                    new AttachmentLibraryUrl(attachmentLibrary.url),
                    new AttachmentLibraryMime(attachmentLibrary.mime),
                    new AttachmentLibraryExtension(attachmentLibrary.extension),
                    new AttachmentLibrarySize(attachmentLibrary.size),
                    new AttachmentLibraryWidth(attachmentLibrary.width),
                    new AttachmentLibraryHeight(attachmentLibrary.height),
                    new AttachmentLibraryData(attachmentLibrary.data),
                    new AttachmentLibraryCreatedAt({currentTimestamp: true}),
                    new AttachmentLibraryUpdatedAt({currentTimestamp: true}),
                    new AttachmentLibraryDeletedAt(null),
                )
            );
        }
    }
}