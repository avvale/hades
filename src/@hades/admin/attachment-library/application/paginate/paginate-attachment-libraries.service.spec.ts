import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { PaginateAttachmentLibrariesService } from './paginate-attachment-libraries.service';
import { IAttachmentLibraryRepository } from './../../domain/attachment-library.repository';
import { MockAttachmentLibraryRepository } from './../../infrastructure/mock/mock-attachment-library.repository';

describe('PaginateAttachmentLibrariesService', () => 
{
    let service: PaginateAttachmentLibrariesService;
    let repository: IAttachmentLibraryRepository;
    let mockRepository: MockAttachmentLibraryRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                PaginateAttachmentLibrariesService,
                MockAttachmentLibraryRepository,
                { 
                    provide: IAttachmentLibraryRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(PaginateAttachmentLibrariesService);
        repository      = module.get(IAttachmentLibraryRepository);
        mockRepository  = module.get(MockAttachmentLibraryRepository);
    });

    describe('main', () => 
    {
        test('PaginateAttachmentLibrariesService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should paginate attachmentLibraries', async () => 
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            })));
            expect(await service.main({
                offset: 0,
                limit: 10
            })).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            });
        });
    });
});