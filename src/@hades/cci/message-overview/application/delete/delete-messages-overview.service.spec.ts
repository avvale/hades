import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteMessagesOverviewService } from './delete-messages-overview.service';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { MockMessageOverviewRepository } from './../../infrastructure/mock/mock-message-overview.repository';

describe('DeleteMessagesOverviewService', () =>
{
    let service: DeleteMessagesOverviewService;
    let repository: IMessageOverviewRepository;
    let mockRepository: MockMessageOverviewRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteMessagesOverviewService,
                MockMessageOverviewRepository,
                {
                    provide: IMessageOverviewRepository,
                    useValue: {
                        get: (queryStatement) => {},
                        delete: (queryStatement) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteMessagesOverviewService);
        repository      = module.get(IMessageOverviewRepository);
        mockRepository  = module.get(MockMessageOverviewRepository);
    });

    describe('main', () =>
    {
        test('DeleteMessagesOverviewService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete messageOverview and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main()).toBe(undefined);
        });
    });
});