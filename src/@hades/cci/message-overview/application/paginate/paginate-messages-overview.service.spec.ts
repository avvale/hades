import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { PaginateMessagesOverviewService } from './paginate-messages-overview.service';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { MockMessageOverviewRepository } from './../../infrastructure/mock/mock-message-overview.repository';

describe('PaginateMessagesOverviewService', () => 
{
    let service: PaginateMessagesOverviewService;
    let repository: IMessageOverviewRepository;
    let mockRepository: MockMessageOverviewRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                PaginateMessagesOverviewService,
                MockMessageOverviewRepository,
                { 
                    provide: IMessageOverviewRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(PaginateMessagesOverviewService);
        repository      = module.get(IMessageOverviewRepository);
        mockRepository  = module.get(MockMessageOverviewRepository);
    });

    describe('main', () => 
    {
        test('PaginateMessagesOverviewService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should paginate messagesOverview', async () => 
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