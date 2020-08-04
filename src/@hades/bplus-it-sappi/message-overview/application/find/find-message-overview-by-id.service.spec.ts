import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { messagesOverview } from '@hades/bplus-it-sappi/message-overview/infrastructure/seeds/message-overview.seed';
import { FindMessageOverviewByIdService } from './find-message-overview-by-id.service';
import { MessageOverviewId } from './../../domain/value-objects';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { MockMessageOverviewRepository } from './../../infrastructure/mock/mock-message-overview.repository';

describe('FindMessageOverviewByIdService', () => 
{
    let service: FindMessageOverviewByIdService;
    let repository: IMessageOverviewRepository;
    let mockRepository: MockMessageOverviewRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindMessageOverviewByIdService,
                MockMessageOverviewRepository,
                { 
                    provide: IMessageOverviewRepository,
                    useValue: {
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindMessageOverviewByIdService);
        repository      = module.get(IMessageOverviewRepository);
        mockRepository  = module.get(MockMessageOverviewRepository);
    });

    describe('main', () => 
    {
        test('FindMessageOverviewByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find messageOverview by id', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new MessageOverviewId(messagesOverview[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});