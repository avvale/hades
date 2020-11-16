import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { FindAttachmentFamilyService } from './find-attachment-family.service';
import { IAttachmentFamilyRepository } from './../../domain/attachment-family.repository';
import { MockAttachmentFamilyRepository } from './../../infrastructure/mock/mock-attachment-family.repository';

describe('FindAttachmentFamilyService', () => 
{
    let service: FindAttachmentFamilyService;
    let repository: IAttachmentFamilyRepository;
    let mockRepository: MockAttachmentFamilyRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindAttachmentFamilyService,
                MockAttachmentFamilyRepository,
                { 
                    provide: IAttachmentFamilyRepository,
                    useValue: {
                        find: (queryStatement) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindAttachmentFamilyService);
        repository      = module.get(IAttachmentFamilyRepository);
        mockRepository  = module.get(MockAttachmentFamilyRepository);
    });

    describe('main', () => 
    {
        test('FindAttachmentFamilyService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find attachmentFamily', async () => 
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});