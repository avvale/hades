import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteChannelOverviewByIdCommandHandler } from './delete-channel-overview-by-id.command-handler';
import { channelsOverview } from '@hades/bplus-it-sappi/channel-overview/infrastructure/seeds/channel-overview.seed';
import { DeleteChannelOverviewByIdCommand } from './delete-channel-overview-by-id.command';
import { DeleteChannelOverviewByIdService } from './delete-channel-overview-by-id.service';

describe('DeleteChannelOverviewByIdCommandHandler', () => 
{
    let commandHandler: DeleteChannelOverviewByIdCommandHandler;
    let service: DeleteChannelOverviewByIdService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteChannelOverviewByIdCommandHandler,
                {
                    provide: DeleteChannelOverviewByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteChannelOverviewByIdCommandHandler>(DeleteChannelOverviewByIdCommandHandler);
        service         = module.get<DeleteChannelOverviewByIdService>(DeleteChannelOverviewByIdService);
    });

    describe('main', () => 
    {
        test('DeleteChannelOverviewByIdCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteChannelOverviewByIdService', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteChannelOverviewByIdCommand(
                    channelsOverview[0].id,
                
                )
            )).toBe(undefined);
        });
    });
});