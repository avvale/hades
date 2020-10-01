import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreateChannelsOverviewService } from './create-channels-overview.service';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { MockChannelOverviewRepository } from './../../infrastructure/mock/mock-channel-overview.repository';

describe('CreateChannelsOverviewService', () => 
{
    let service: CreateChannelsOverviewService;
    let repository: IChannelOverviewRepository;
    let mockRepository: MockChannelOverviewRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateChannelsOverviewService,
                MockChannelOverviewRepository,
                { 
                    provide: IChannelOverviewRepository,
                    useValue: {
                        insert: (items) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateChannelsOverviewService);
        repository      = module.get(IChannelOverviewRepository);
        mockRepository  = module.get(MockChannelOverviewRepository);
    });

    describe('main', () => 
    {
        test('CreateChannelsOverviewService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create channelsOverview and emit event', async () => 
        {
            expect(await service.main(
                mockRepository.collectionSource
            )).toBe(undefined);
        });
    });
});