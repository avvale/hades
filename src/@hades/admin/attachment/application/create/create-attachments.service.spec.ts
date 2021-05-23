import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreateAttachmentsService } from './create-attachments.service';
import { IAttachmentRepository } from './../../domain/attachment.repository';
import { MockAttachmentRepository } from './../../infrastructure/mock/mock-attachment.repository';

describe('CreateAttachmentsService', () =>
{
    let service: CreateAttachmentsService;
    let repository: IAttachmentRepository;
    let mockRepository: MockAttachmentRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateAttachmentsService,
                MockAttachmentRepository,
                {
                    provide: IAttachmentRepository,
                    useValue: {
                        insert: (items) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateAttachmentsService);
        repository      = module.get(IAttachmentRepository);
        mockRepository  = module.get(MockAttachmentRepository);
    });

    describe('main', () =>
    {
        test('CreateAttachmentsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create attachments and emit event', async () =>
        {
            expect(await service.main(
                mockRepository.collectionSource
            )).toBe(undefined);
        });
    });
});