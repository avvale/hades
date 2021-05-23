import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetMessagesDetailService } from './get-messages-detail.service';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';
import { MockMessageDetailRepository } from './../../infrastructure/mock/mock-message-detail.repository';

describe('GetMessagesDetailService', () =>
{
    let service: GetMessagesDetailService;
    let repository: IMessageDetailRepository;
    let mockRepository: MockMessageDetailRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetMessagesDetailService,
                MockMessageDetailRepository,
                {
                    provide: IMessageDetailRepository,
                    useValue: {
                        get: (queryStatement) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(GetMessagesDetailService);
        repository      = module.get(IMessageDetailRepository);
        mockRepository  = module.get(MockMessageDetailRepository);
    });

    describe('main', () =>
    {
        test('GetMessagesDetailService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get messagesDetail', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});