import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteChannelByIdCommandHandler } from './delete-channel-by-id.command-handler';
import { channels } from '@hades/cci/channel/infrastructure/seeds/channel.seed';
import { DeleteChannelByIdCommand } from './delete-channel-by-id.command';
import { DeleteChannelByIdService } from './delete-channel-by-id.service';

describe('DeleteChannelByIdCommandHandler', () =>
{
    let commandHandler: DeleteChannelByIdCommandHandler;
    let service: DeleteChannelByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteChannelByIdCommandHandler,
                {
                    provide: DeleteChannelByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteChannelByIdCommandHandler>(DeleteChannelByIdCommandHandler);
        service         = module.get<DeleteChannelByIdService>(DeleteChannelByIdService);
    });

    describe('main', () =>
    {
        test('DeleteChannelByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteChannelByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteChannelByIdCommand(
                    channels[0].id,
                )
            )).toBe(undefined);
        });
    });
});