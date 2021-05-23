import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { channelsOverview } from '@hades/cci/channel-overview/infrastructure/seeds/channel-overview.seed';
import { CreateChannelOverviewCommandHandler } from './create-channel-overview.command-handler';
import { CreateChannelOverviewCommand } from './create-channel-overview.command';
import { CreateChannelOverviewService } from './create-channel-overview.service';

describe('CreateChannelOverviewCommandHandler', () =>
{
    let commandHandler: CreateChannelOverviewCommandHandler;
    let service: CreateChannelOverviewService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateChannelOverviewCommandHandler,
                {
                    provide: CreateChannelOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateChannelOverviewCommandHandler>(CreateChannelOverviewCommandHandler);
        service         = module.get<CreateChannelOverviewService>(CreateChannelOverviewService);
    });

    describe('main', () =>
    {
        test('CreateChannelOverviewCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateChannelOverviewService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateChannelOverviewCommand(
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