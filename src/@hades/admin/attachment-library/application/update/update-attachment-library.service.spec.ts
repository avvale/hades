import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { attachmentLibraries } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';
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
                {
                    id: new AttachmentLibraryId(attachmentLibraries[0].id),
                    name: new AttachmentLibraryName(attachmentLibraries[0].name),
                    pathname: new AttachmentLibraryPathname(attachmentLibraries[0].pathname),
                    filename: new AttachmentLibraryFilename(attachmentLibraries[0].filename),
                    url: new AttachmentLibraryUrl(attachmentLibraries[0].url),
                    mime: new AttachmentLibraryMime(attachmentLibraries[0].mime),
                    extension: new AttachmentLibraryExtension(attachmentLibraries[0].extension),
                    size: new AttachmentLibrarySize(attachmentLibraries[0].size),
                    width: new AttachmentLibraryWidth(attachmentLibraries[0].width),
                    height: new AttachmentLibraryHeight(attachmentLibraries[0].height),
                    data: new AttachmentLibraryData(attachmentLibraries[0].data),
                }
            )).toBe(undefined);
        });
    });
});