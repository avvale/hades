import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteAttachmentsService } from './delete-attachments.service';
import { IAttachmentRepository } from './../../domain/attachment.repository';
import { MockAttachmentRepository } from './../../infrastructure/mock/mock-attachment.repository';

describe('DeleteAttachmentsService', () => 
{
    let service: DeleteAttachmentsService;
    let repository: IAttachmentRepository;
    let mockRepository: MockAttachmentRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteAttachmentsService,
                MockAttachmentRepository,
                { 
                    provide: IAttachmentRepository,
                    useValue: {
                        get: (queryStatement) => {},
                        delete: (queryStatement) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteAttachmentsService);
        repository      = module.get(IAttachmentRepository);
        mockRepository  = module.get(MockAttachmentRepository);
    });

    describe('main', () => 
    {
        test('DeleteAttachmentsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete attachment and emit event', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main()).toBe(undefined);
        });
    });
});