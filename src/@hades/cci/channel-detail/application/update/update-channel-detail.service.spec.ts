import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { channelsDetail } from '@hades/cci/channel-detail/infrastructure/seeds/channel-detail.seed';
import { UpdateChannelDetailService } from './update-channel-detail.service';
import {
    ChannelDetailId,
    ChannelDetailTenantId,
    ChannelDetailTenantCode,
    ChannelDetailSystemId,
    ChannelDetailSystemName,
    ChannelDetailExecutionId,
    ChannelDetailExecutionType,
    ChannelDetailExecutionExecutedAt,
    ChannelDetailExecutionMonitoringStartAt,
    ChannelDetailExecutionMonitoringEndAt,
    ChannelDetailStatus,
    ChannelDetailChannelHash,
    ChannelDetailChannelSapId,
    ChannelDetailChannelParty,
    ChannelDetailChannelComponent,
    ChannelDetailChannelName,
    ChannelDetailDetail,
    ChannelDetailCreatedAt,
    ChannelDetailUpdatedAt,
    ChannelDetailDeletedAt,
} from './../../domain/value-objects';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';
import { MockChannelDetailRepository } from './../../infrastructure/mock/mock-channel-detail.repository';

describe('UpdateChannelDetailService', () =>
{
    let service: UpdateChannelDetailService;
    let repository: IChannelDetailRepository;
    let mockRepository: MockChannelDetailRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateChannelDetailService,
                MockChannelDetailRepository,
                {
                    provide: IChannelDetailRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateChannelDetailService);
        repository      = module.get(IChannelDetailRepository);
        mockRepository  = module.get(MockChannelDetailRepository);
    });

    describe('main', () =>
    {
        test('UpdateChannelDetailService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a channelDetail and emit event', async () =>
        {
            expect(await service.main(
                new ChannelDetailId(channelsDetail[0].id),
                new ChannelDetailTenantId(channelsDetail[0].tenantId),
                new ChannelDetailTenantCode(channelsDetail[0].tenantCode),
                new ChannelDetailSystemId(channelsDetail[0].systemId),
                new ChannelDetailSystemName(channelsDetail[0].systemName),
                new ChannelDetailExecutionId(channelsDetail[0].executionId),
                new ChannelDetailExecutionType(channelsDetail[0].executionType),
                new ChannelDetailExecutionExecutedAt(channelsDetail[0].executionExecutedAt),
                new ChannelDetailExecutionMonitoringStartAt(channelsDetail[0].executionMonitoringStartAt),
                new ChannelDetailExecutionMonitoringEndAt(channelsDetail[0].executionMonitoringEndAt),
                new ChannelDetailStatus(channelsDetail[0].status),
                new ChannelDetailChannelHash(channelsDetail[0].channelHash),
                new ChannelDetailChannelSapId(channelsDetail[0].channelSapId),
                new ChannelDetailChannelParty(channelsDetail[0].channelParty),
                new ChannelDetailChannelComponent(channelsDetail[0].channelComponent),
                new ChannelDetailChannelName(channelsDetail[0].channelName),
                new ChannelDetailDetail(channelsDetail[0].detail),
            )).toBe(undefined);
        });
    });
});