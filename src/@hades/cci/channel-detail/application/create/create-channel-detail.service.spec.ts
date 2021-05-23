import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { channelsDetail } from '@hades/cci/channel-detail/infrastructure/seeds/channel-detail.seed';
import { CreateChannelDetailService } from './create-channel-detail.service';
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

describe('CreateChannelDetailService', () =>

{
    let service: CreateChannelDetailService;
    let repository: IChannelDetailRepository;
    let mockRepository: MockChannelDetailRepository;

    beforeAll(async () =>
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
                        create: (item) => {}
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
            expect(await service.main(
                {
                    id: new ChannelDetailId(channelsDetail[0].id),
                    tenantId: new ChannelDetailTenantId(channelsDetail[0].tenantId),
                    tenantCode: new ChannelDetailTenantCode(channelsDetail[0].tenantCode),
                    systemId: new ChannelDetailSystemId(channelsDetail[0].systemId),
                    systemName: new ChannelDetailSystemName(channelsDetail[0].systemName),
                    executionId: new ChannelDetailExecutionId(channelsDetail[0].executionId),
                    executionType: new ChannelDetailExecutionType(channelsDetail[0].executionType),
                    executionExecutedAt: new ChannelDetailExecutionExecutedAt(channelsDetail[0].executionExecutedAt),
                    executionMonitoringStartAt: new ChannelDetailExecutionMonitoringStartAt(channelsDetail[0].executionMonitoringStartAt),
                    executionMonitoringEndAt: new ChannelDetailExecutionMonitoringEndAt(channelsDetail[0].executionMonitoringEndAt),
                    status: new ChannelDetailStatus(channelsDetail[0].status),
                    channelHash: new ChannelDetailChannelHash(channelsDetail[0].channelHash),
                    channelSapId: new ChannelDetailChannelSapId(channelsDetail[0].channelSapId),
                    channelParty: new ChannelDetailChannelParty(channelsDetail[0].channelParty),
                    channelComponent: new ChannelDetailChannelComponent(channelsDetail[0].channelComponent),
                    channelName: new ChannelDetailChannelName(channelsDetail[0].channelName),
                    detail: new ChannelDetailDetail(channelsDetail[0].detail),
                }
            )).toBe(undefined);
        });
    });
});