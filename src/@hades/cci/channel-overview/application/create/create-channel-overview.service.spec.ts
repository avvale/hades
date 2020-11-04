import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { channelsOverview } from '@hades/cci/channel-overview/infrastructure/seeds/channel-overview.seed';
import { CreateChannelOverviewService } from './create-channel-overview.service';
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

describe('CreateChannelOverviewService', () =>

{
    let service: CreateChannelOverviewService;
    let repository: IChannelOverviewRepository;
    let mockRepository: MockChannelOverviewRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateChannelOverviewService,
                MockChannelOverviewRepository,
                {
                    provide: IChannelOverviewRepository,
                    useValue: {
                        create: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateChannelOverviewService);
        repository      = module.get(IChannelOverviewRepository);
        mockRepository  = module.get(MockChannelOverviewRepository);
    });

    describe('main', () =>
    {
        test('CreateChannelOverviewService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a channelOverview and emit event', async () =>
        {
            expect(await service.main(
                new ChannelOverviewId(channelsOverview[0].id),
                new ChannelOverviewTenantId(channelsOverview[0].tenantId),
                new ChannelOverviewTenantCode(channelsOverview[0].tenantCode),
                new ChannelOverviewSystemId(channelsOverview[0].systemId),
                new ChannelOverviewSystemName(channelsOverview[0].systemName),
                new ChannelOverviewExecutionId(channelsOverview[0].executionId),
                new ChannelOverviewExecutionType(channelsOverview[0].executionType),
                new ChannelOverviewExecutionExecutedAt(channelsOverview[0].executionExecutedAt),
                new ChannelOverviewExecutionMonitoringStartAt(channelsOverview[0].executionMonitoringStartAt),
                new ChannelOverviewExecutionMonitoringEndAt(channelsOverview[0].executionMonitoringEndAt),
                new ChannelOverviewError(channelsOverview[0].error),
                new ChannelOverviewInactive(channelsOverview[0].inactive),
                new ChannelOverviewSuccessful(channelsOverview[0].successful),
                new ChannelOverviewStopped(channelsOverview[0].stopped),
                new ChannelOverviewUnknown(channelsOverview[0].unknown),
                new ChannelOverviewUnregistered(channelsOverview[0].unregistered),
                
            )).toBe(undefined);
        });
    });
});