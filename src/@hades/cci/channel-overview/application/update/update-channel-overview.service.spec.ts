import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { channelsOverview } from '@hades/cci/channel-overview/infrastructure/seeds/channel-overview.seed';
import { UpdateChannelOverviewService } from './update-channel-overview.service';
import {
    ChannelOverviewId,
    ChannelOverviewTenantId,
    ChannelOverviewTenantCode,
    ChannelOverviewSystemId,
    ChannelOverviewSystemName,
    ChannelOverviewExecutionId,
    ChannelOverviewExecutionType,
    ChannelOverviewExecutionExecutedAt,
    ChannelOverviewExecutionMonitoringStartAt,
    ChannelOverviewExecutionMonitoringEndAt,
    ChannelOverviewError,
    ChannelOverviewInactive,
    ChannelOverviewSuccessful,
    ChannelOverviewStopped,
    ChannelOverviewUnknown,
    ChannelOverviewUnregistered,
    ChannelOverviewCreatedAt,
    ChannelOverviewUpdatedAt,
    ChannelOverviewDeletedAt,
} from './../../domain/value-objects';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { MockChannelOverviewRepository } from './../../infrastructure/mock/mock-channel-overview.repository';

describe('UpdateChannelOverviewService', () =>
{
    let service: UpdateChannelOverviewService;
    let repository: IChannelOverviewRepository;
    let mockRepository: MockChannelOverviewRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateChannelOverviewService,
                MockChannelOverviewRepository,
                {
                    provide: IChannelOverviewRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateChannelOverviewService);
        repository      = module.get(IChannelOverviewRepository);
        mockRepository  = module.get(MockChannelOverviewRepository);
    });

    describe('main', () =>
    {
        test('UpdateChannelOverviewService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a channelOverview and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new ChannelOverviewId(channelsOverview[0].id),
                    tenantId: new ChannelOverviewTenantId(channelsOverview[0].tenantId),
                    tenantCode: new ChannelOverviewTenantCode(channelsOverview[0].tenantCode),
                    systemId: new ChannelOverviewSystemId(channelsOverview[0].systemId),
                    systemName: new ChannelOverviewSystemName(channelsOverview[0].systemName),
                    executionId: new ChannelOverviewExecutionId(channelsOverview[0].executionId),
                    executionType: new ChannelOverviewExecutionType(channelsOverview[0].executionType),
                    executionExecutedAt: new ChannelOverviewExecutionExecutedAt(channelsOverview[0].executionExecutedAt),
                    executionMonitoringStartAt: new ChannelOverviewExecutionMonitoringStartAt(channelsOverview[0].executionMonitoringStartAt),
                    executionMonitoringEndAt: new ChannelOverviewExecutionMonitoringEndAt(channelsOverview[0].executionMonitoringEndAt),
                    error: new ChannelOverviewError(channelsOverview[0].error),
                    inactive: new ChannelOverviewInactive(channelsOverview[0].inactive),
                    successful: new ChannelOverviewSuccessful(channelsOverview[0].successful),
                    stopped: new ChannelOverviewStopped(channelsOverview[0].stopped),
                    unknown: new ChannelOverviewUnknown(channelsOverview[0].unknown),
                    unregistered: new ChannelOverviewUnregistered(channelsOverview[0].unregistered),
                }
            )).toBe(undefined);
        });
    });
});