import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteChannelsOverviewCommandHandler } from './delete-channels-overview.command-handler';
import { DeleteChannelsOverviewCommand } from './delete-channels-overview.command';
import { DeleteChannelsOverviewService } from './delete-channels-overview.service';

describe('DeleteChannelsOverviewCommandHandler', () => 
{
    let commandHandler: DeleteChannelsOverviewCommandHandler;
    let service: DeleteChannelsOverviewService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteChannelsOverviewCommandHandler,
                {
                    provide: DeleteChannelsOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteChannelsOverviewCommandHandler>(DeleteChannelsOverviewCommandHandler);
        service         = module.get<DeleteChannelsOverviewService>(DeleteChannelsOverviewService);
    });

    describe('main', () => 
    {
        test('DeleteChannelsOverviewCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteChannelsOverviewCommand()
            )).toBe(undefined);
        });
    });
});