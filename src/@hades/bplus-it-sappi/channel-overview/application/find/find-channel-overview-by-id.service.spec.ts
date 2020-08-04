import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { channelsOverview } from '@hades/bplus-it-sappi/channel-overview/infrastructure/seeds/channel-overview.seed';
import { FindChannelOverviewByIdService } from './find-channel-overview-by-id.service';
import { ChannelOverviewId } from './../../domain/value-objects';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { MockChannelOverviewRepository } from './../../infrastructure/mock/mock-channel-overview.repository';

describe('FindChannelOverviewByIdService', () => 
{
    let service: FindChannelOverviewByIdService;
    let repository: IChannelOverviewRepository;
    let mockRepository: MockChannelOverviewRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindChannelOverviewByIdService,
                MockChannelOverviewRepository,
                { 
                    provide: IChannelOverviewRepository,
                    useValue: {
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindChannelOverviewByIdService);
        repository      = module.get(IChannelOverviewRepository);
        mockRepository  = module.get(MockChannelOverviewRepository);
    });

    describe('main', () => 
    {
        test('FindChannelOverviewByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find channelOverview by id', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ChannelOverviewId(channelsOverview[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});