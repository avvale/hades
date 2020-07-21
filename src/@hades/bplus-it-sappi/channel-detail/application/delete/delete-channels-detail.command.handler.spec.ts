import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteChannelsDetailCommandHandler } from './delete-channels-detail.command-handler';
import { DeleteChannelsDetailCommand } from './delete-channels-detail.command';
import { DeleteChannelsDetailService } from './delete-channels-detail.service';

describe('DeleteChannelsDetailCommandHandler', () => 
{
    let commandHandler: DeleteChannelsDetailCommandHandler;
    let service: DeleteChannelsDetailService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteChannelsDetailCommandHandler,
                {
                    provide: DeleteChannelsDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteChannelsDetailCommandHandler>(DeleteChannelsDetailCommandHandler);
        service         = module.get<DeleteChannelsDetailService>(DeleteChannelsDetailService);
    });

    describe('main', () => 
    {
        test('DeleteChannelsDetailCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteChannelsDetailCommand()
            )).toBe(undefined);
        });
    });
});