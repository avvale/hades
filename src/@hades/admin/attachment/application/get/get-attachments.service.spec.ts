import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetAttachmentsService } from './get-attachments.service';
import { IAttachmentRepository } from './../../domain/attachment.repository';
import { MockAttachmentRepository } from './../../infrastructure/mock/mock-attachment.repository';

describe('GetAttachmentsService', () => 
{
    let service: GetAttachmentsService;
    let repository: IAttachmentRepository;
    let mockRepository: MockAttachmentRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetAttachmentsService,
                MockAttachmentRepository,
                { 
                    provide: IAttachmentRepository,
                    useValue: {
                        get: (queryStatement) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(GetAttachmentsService);
        repository      = module.get(IAttachmentRepository);
        mockRepository  = module.get(MockAttachmentRepository);
    });

    describe('main', () => 
    {
        test('GetAttachmentsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should get attachments', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});