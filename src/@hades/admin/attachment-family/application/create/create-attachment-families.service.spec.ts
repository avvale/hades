import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreateAttachmentFamiliesService } from './create-attachment-families.service';
import { IAttachmentFamilyRepository } from './../../domain/attachment-family.repository';
import { MockAttachmentFamilyRepository } from './../../infrastructure/mock/mock-attachment-family.repository';

describe('CreateAttachmentFamiliesService', () => 
{
    let service: CreateAttachmentFamiliesService;
    let repository: IAttachmentFamilyRepository;
    let mockRepository: MockAttachmentFamilyRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateAttachmentFamiliesService,
                MockAttachmentFamilyRepository,
                { 
                    provide: IAttachmentFamilyRepository,
                    useValue: {
                        insert: (items) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateAttachmentFamiliesService);
        repository      = module.get(IAttachmentFamilyRepository);
        mockRepository  = module.get(MockAttachmentFamilyRepository);
    });

    describe('main', () => 
    {
        test('CreateAttachmentFamiliesService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create attachmentFamilies and emit event', async () => 
        {
            expect(await service.main(
                mockRepository.collectionSource
            )).toBe(undefined);
        });
    });
});