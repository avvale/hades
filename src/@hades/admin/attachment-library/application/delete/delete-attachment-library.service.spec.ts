import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteAttachmentLibraryService } from './delete-attachment-library.service';
import { IAttachmentLibraryRepository } from './../../domain/attachment-library.repository';
import { MockAttachmentLibraryRepository } from './../../infrastructure/mock/mock-attachment-library.repository';

describe('DeleteAttachmentLibraryService', () => 
{
    let service: DeleteAttachmentLibraryService;
    let repository: IAttachmentLibraryRepository;
    let mockRepository: MockAttachmentLibraryRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteAttachmentLibraryService,
                MockAttachmentLibraryRepository,
                { 
                    provide: IAttachmentLibraryRepository,
                    useValue: {
                        get: (queryStatement) => {},
                        delete: (queryStatement) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteAttachmentLibraryService);
        repository      = module.get(IAttachmentLibraryRepository);
        mockRepository  = module.get(MockAttachmentLibraryRepository);
    });

    describe('main', () => 
    {
        test('DeleteAttachmentLibraryService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete attachmentLibrary and emit event', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main()).toBe(undefined);
        });
    });
});