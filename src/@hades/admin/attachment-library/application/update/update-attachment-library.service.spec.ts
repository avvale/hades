import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { attachmentLibrary } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';
import { UpdateAttachmentLibraryService } from './update-attachment-library.service';
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
import { IAttachmentLibraryRepository } from './../../domain/attachment-library.repository';
import { MockAttachmentLibraryRepository } from './../../infrastructure/mock/mock-attachment-library.repository';

describe('UpdateAttachmentLibraryService', () =>
{
    let service: UpdateAttachmentLibraryService;
    let repository: IAttachmentLibraryRepository;
    let mockRepository: MockAttachmentLibraryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateAttachmentLibraryService,
                MockAttachmentLibraryRepository,
                {
                    provide: IAttachmentLibraryRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateAttachmentLibraryService);
        repository      = module.get(IAttachmentLibraryRepository);
        mockRepository  = module.get(MockAttachmentLibraryRepository);
    });

    describe('main', () =>
    {
        test('UpdateAttachmentLibraryService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a attachmentLibrary and emit event', async () =>
        {
            expect(await service.main(
                new AttachmentLibraryId(attachmentLibrary[0].id),
                new AttachmentLibraryName(attachmentLibrary[0].name),
                new AttachmentLibraryPathname(attachmentLibrary[0].pathname),
                new AttachmentLibraryFilename(attachmentLibrary[0].filename),
                new AttachmentLibraryUrl(attachmentLibrary[0].url),
                new AttachmentLibraryMime(attachmentLibrary[0].mime),
                new AttachmentLibraryExtension(attachmentLibrary[0].extension),
                new AttachmentLibrarySize(attachmentLibrary[0].size),
                new AttachmentLibraryWidth(attachmentLibrary[0].width),
                new AttachmentLibraryHeight(attachmentLibrary[0].height),
                new AttachmentLibraryData(attachmentLibrary[0].data),
            )).toBe(undefined);
        });
    });
});