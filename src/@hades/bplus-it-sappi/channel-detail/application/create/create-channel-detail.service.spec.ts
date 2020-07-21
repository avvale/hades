import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { channelsDetail } from '@hades/bplus-it-sappi/channel-detail/infrastructure/seeds/channel-detail.seed';
import { CreateChannelDetailService } from './create-channel-detail.service';
import { 
    ChannelDetailId, 
    ChannelDetailTenantId, 
    ChannelDetailSystemId, 
    ChannelDetailSystemName, 
    ChannelDetailExecutionId, 
    ChannelDetailExecutionType, 
    ChannelDetailExecutionExecutedAt, 
    ChannelDetailExecutionMonitoringStartAt, 
    ChannelDetailExecutionMonitoringEndAt, 
    ChannelDetailStatus, 
    ChannelDetailChannelId, 
    ChannelDetailChannelParty, 
    ChannelDetailChannelComponent, 
    ChannelDetailChannelName, 
    ChannelDetailDetail, 
    ChannelDetailExample
    
} from './../../domain/value-objects';
import { IChannelDetailRepository } from '../../domain/channel-detail.repository';
import { MockChannelDetailRepository } from '../../infrastructure/mock/mock-channel-detail.repository';

describe('CreateChannelDetailService', () => 
{
    let service: CreateChannelDetailService;
    let repository: IChannelDetailRepository;
    let mockRepository: MockChannelDetailRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateChannelDetailService,
                MockChannelDetailRepository,
                { 
                    provide: IChannelDetailRepository,
                    useValue: {
                        create: (item) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateChannelDetailService);
        repository      = module.get(IChannelDetailRepository);
        mockRepository  = module.get(MockChannelDetailRepository);
    });

    describe('main', () => 
    {
        test('CreateChannelDetailService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create a channelDetail and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ChannelDetailId(channelsDetail[0].id),
                new ChannelDetailTenantId(channelsDetail[0].tenantId),
                new ChannelDetailSystemId(channelsDetail[0].systemId),
                new ChannelDetailSystemName(channelsDetail[0].systemName),
                new ChannelDetailExecutionId(channelsDetail[0].executionId),
                new ChannelDetailExecutionType(channelsDetail[0].executionType),
                new ChannelDetailExecutionExecutedAt(channelsDetail[0].executionExecutedAt),
                new ChannelDetailExecutionMonitoringStartAt(channelsDetail[0].executionMonitoringStartAt),
                new ChannelDetailExecutionMonitoringEndAt(channelsDetail[0].executionMonitoringEndAt),
                new ChannelDetailStatus(channelsDetail[0].status),
                new ChannelDetailChannelId(channelsDetail[0].channelId),
                new ChannelDetailChannelParty(channelsDetail[0].channelParty),
                new ChannelDetailChannelComponent(channelsDetail[0].channelComponent),
                new ChannelDetailChannelName(channelsDetail[0].channelName),
                new ChannelDetailDetail(channelsDetail[0].detail),
                new ChannelDetailExample(channelsDetail[0].example),
                
            )).toBe(undefined);
        });
    });
});