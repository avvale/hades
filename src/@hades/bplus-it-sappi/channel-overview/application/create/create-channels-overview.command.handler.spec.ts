import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateChannelsOverviewCommandHandler } from './create-channels-overview.command-handler';
import { channelsOverview } from '@hades/bplus-it-sappi/channel-overview/infrastructure/seeds/channel-overview.seed';
import { CreateChannelsOverviewCommand } from './create-channels-overview.command';
import { CreateChannelsOverviewService } from './create-channels-overview.service';

describe('CreateChannelsOverviewCommandHandler', () => 
{
    let commandHandler: CreateChannelsOverviewCommandHandler;
    let service: CreateChannelsOverviewService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateChannelsOverviewCommandHandler,
                {
                    provide: CreateChannelsOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateChannelsOverviewCommandHandler>(CreateChannelsOverviewCommandHandler);
        service         = module.get<CreateChannelsOverviewService>(CreateChannelsOverviewService);
    });

    describe('main', () => 
    {
        test('CreateChannelsOverviewCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an channelOverview created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateChannelsOverviewCommand(
                    channelsOverview
                
                )
            )).toBe(undefined);
        });
    });
});