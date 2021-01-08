import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { attachmentLibraries } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';
import { DeleteAttachmentLibraryByIdService } from './delete-attachment-library-by-id.service';
import { AttachmentLibraryId } from './../../domain/value-objects';
import { IAttachmentLibraryRepository } from './../../domain/attachment-library.repository';
import { MockAttachmentLibraryRepository } from './../../infrastructure/mock/mock-attachment-library.repository';

describe('DeleteAttachmentLibraryByIdService', () => 
{
    let service: DeleteAttachmentLibraryByIdService;
    let repository: IAttachmentLibraryRepository;
    let mockRepository: MockAttachmentLibraryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteAttachmentLibraryByIdService,
                MockAttachmentLibraryRepository,
                {
                    provide: IAttachmentLibraryRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteAttachmentLibraryByIdService);
        repository      = module.get(IAttachmentLibraryRepository);
        mockRepository  = module.get(MockAttachmentLibraryRepository);
    });

    describe('main', () => 
    {
        test('DeleteAttachmentLibraryByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete attachmentLibrary and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AttachmentLibraryId(attachmentLibraries[0].id)
            )).toBe(undefined);
        });
    });
});