import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { channelsOverview } from '@hades/cci/channel-overview/infrastructure/seeds/channel-overview.seed';
import { UpdateChannelOverviewCommandHandler } from './update-channel-overview.command-handler';
import { UpdateChannelOverviewCommand } from './update-channel-overview.command';
import { UpdateChannelOverviewService } from './update-channel-overview.service';

describe('UpdateChannelOverviewCommandHandler', () =>
{
    let commandHandler: UpdateChannelOverviewCommandHandler;
    let service: UpdateChannelOverviewService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateChannelOverviewCommandHandler,
                {
                    provide: UpdateChannelOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateChannelOverviewCommandHandler>(UpdateChannelOverviewCommandHandler);
        service         = module.get<UpdateChannelOverviewService>(UpdateChannelOverviewService);
    });

    describe('main', () =>
    {
        test('UpdateChannelOverviewCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an channelOverview created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateChannelOverviewCommand(
                    {
                        id: channelsOverview[0].id,
                        tenantId: channelsOverview[0].tenantId,
                        tenantCode: channelsOverview[0].tenantCode,
                        systemId: channelsOverview[0].systemId,
                        systemName: channelsOverview[0].systemName,
                        executionId: channelsOverview[0].executionId,
                        executionType: channelsOverview[0].executionType,
                        executionExecutedAt: channelsOverview[0].executionExecutedAt,
                        executionMonitoringStartAt: channelsOverview[0].executionMonitoringStartAt,
                        executionMonitoringEndAt: channelsOverview[0].executionMonitoringEndAt,
                        error: channelsOverview[0].error,
                        inactive: channelsOverview[0].inactive,
                        successful: channelsOverview[0].successful,
                        stopped: channelsOverview[0].stopped,
                        unknown: channelsOverview[0].unknown,
                        unregistered: channelsOverview[0].unregistered,
                    }
                )
            )).toBe(undefined);
        });
    });
});