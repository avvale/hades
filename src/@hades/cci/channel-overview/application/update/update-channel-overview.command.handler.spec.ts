import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateChannelOverviewCommandHandler } from './update-channel-overview.command-handler';
import { channelsOverview } from '@hades/cci/channel-overview/infrastructure/seeds/channel-overview.seed';
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
                    channelsOverview[0].id,
                    channelsOverview[0].tenantId,
                    channelsOverview[0].tenantCode,
                    channelsOverview[0].systemId,
                    channelsOverview[0].systemName,
                    channelsOverview[0].executionId,
                    channelsOverview[0].executionType,
                    channelsOverview[0].executionExecutedAt,
                    channelsOverview[0].executionMonitoringStartAt,
                    channelsOverview[0].executionMonitoringEndAt,
                    channelsOverview[0].error,
                    channelsOverview[0].inactive,
                    channelsOverview[0].successful,
                    channelsOverview[0].stopped,
                    channelsOverview[0].unknown,
                    channelsOverview[0].unregistered,
                )
            )).toBe(undefined);
        });
    });
});