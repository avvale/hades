import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { FindMessageOverviewService } from './find-message-overview.service';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { MockMessageOverviewRepository } from './../../infrastructure/mock/mock-message-overview.repository';

describe('FindMessageOverviewService', () => 
{
    let service: FindMessageOverviewService;
    let repository: IMessageOverviewRepository;
    let mockRepository: MockMessageOverviewRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindMessageOverviewService,
                MockMessageOverviewRepository,
                { 
                    provide: IMessageOverviewRepository,
                    useValue: {
                        find: (queryStatement) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindMessageOverviewService);
        repository      = module.get(IMessageOverviewRepository);
        mockRepository  = module.get(MockMessageOverviewRepository);
    });

    describe('main', () => 
    {
        test('FindMessageOverviewService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find messageOverview', async () => 
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});