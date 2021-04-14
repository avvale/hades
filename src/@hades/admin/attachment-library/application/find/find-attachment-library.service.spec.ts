import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { FindAttachmentLibraryService } from './find-attachment-library.service';
import { IAttachmentLibraryRepository } from './../../domain/attachment-library.repository';
import { MockAttachmentLibraryRepository } from './../../infrastructure/mock/mock-attachment-library.repository';

describe('FindAttachmentLibraryService', () =>
{
    let service: FindAttachmentLibraryService;
    let repository: IAttachmentLibraryRepository;
    let mockRepository: MockAttachmentLibraryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindAttachmentLibraryService,
                MockAttachmentLibraryRepository,
                {
                    provide: IAttachmentLibraryRepository,
                    useValue: {
                        find: (queryStatement) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindAttachmentLibraryService);
        repository      = module.get(IAttachmentLibraryRepository);
        mockRepository  = module.get(MockAttachmentLibraryRepository);
    });

    describe('main', () =>
    {
        test('FindAttachmentLibraryService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find attachmentLibrary', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});