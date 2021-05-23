import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteChannelsCommandHandler } from './delete-channels.command-handler';
import { DeleteChannelsCommand } from './delete-channels.command';
import { DeleteChannelsService } from './delete-channels.service';

describe('DeleteChannelsCommandHandler', () =>
{
    let commandHandler: DeleteChannelsCommandHandler;
    let service: DeleteChannelsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteChannelsCommandHandler,
                {
                    provide: DeleteChannelsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteChannelsCommandHandler>(DeleteChannelsCommandHandler);
        service         = module.get<DeleteChannelsService>(DeleteChannelsService);
    });

    describe('main', () =>
    {
        test('DeleteChannelsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteChannelsCommand()
            )).toBe(undefined);
        });
    });
});