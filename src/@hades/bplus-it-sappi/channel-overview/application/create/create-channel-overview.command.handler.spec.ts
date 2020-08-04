import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateChannelOverviewCommandHandler } from './create-channel-overview.command-handler';
import { channelsOverview } from '@hades/bplus-it-sappi/channel-overview/infrastructure/seeds/channel-overview.seed';
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