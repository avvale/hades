import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { FindAttachmentService } from './find-attachment.service';
import { IAttachmentRepository } from './../../domain/attachment.repository';
import { MockAttachmentRepository } from './../../infrastructure/mock/mock-attachment.repository';

describe('FindAttachmentService', () => 
{
    let service: FindAttachmentService;
    let repository: IAttachmentRepository;
    let mockRepository: MockAttachmentRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindAttachmentService,
                MockAttachmentRepository,
                { 
                    provide: IAttachmentRepository,
                    useValue: {
                        find: (queryStatement) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindAttachmentService);
        repository      = module.get(IAttachmentRepository);
        mockRepository  = module.get(MockAttachmentRepository);
    });

    describe('main', () => 
    {
        test('FindAttachmentService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find attachment', async () => 
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});