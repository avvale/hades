import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetAttachmentFamiliesService } from './get-attachment-families.service';
import { IAttachmentFamilyRepository } from './../../domain/attachment-family.repository';
import { MockAttachmentFamilyRepository } from './../../infrastructure/mock/mock-attachment-family.repository';

describe('GetAttachmentFamiliesService', () =>
{
    let service: GetAttachmentFamiliesService;
    let repository: IAttachmentFamilyRepository;
    let mockRepository: MockAttachmentFamilyRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetAttachmentFamiliesService,
                MockAttachmentFamilyRepository,
                {
                    provide: IAttachmentFamilyRepository,
                    useValue: {
                        get: (queryStatement) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(GetAttachmentFamiliesService);
        repository      = module.get(IAttachmentFamilyRepository);
        mockRepository  = module.get(MockAttachmentFamilyRepository);
    });

    describe('main', () =>
    {
        test('GetAttachmentFamiliesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get attachmentFamilies', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});