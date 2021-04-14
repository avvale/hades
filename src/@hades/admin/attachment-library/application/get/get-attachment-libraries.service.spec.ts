import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetAttachmentLibrariesService } from './get-attachment-libraries.service';
import { IAttachmentLibraryRepository } from './../../domain/attachment-library.repository';
import { MockAttachmentLibraryRepository } from './../../infrastructure/mock/mock-attachment-library.repository';

describe('GetAttachmentLibrariesService', () =>
{
    let service: GetAttachmentLibrariesService;
    let repository: IAttachmentLibraryRepository;
    let mockRepository: MockAttachmentLibraryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetAttachmentLibrariesService,
                MockAttachmentLibraryRepository,
                {
                    provide: IAttachmentLibraryRepository,
                    useValue: {
                        get: (queryStatement) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(GetAttachmentLibrariesService);
        repository      = module.get(IAttachmentLibraryRepository);
        mockRepository  = module.get(MockAttachmentLibraryRepository);
    });

    describe('main', () =>
    {
        test('GetAttachmentLibrariesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get attachmentLibraries', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});