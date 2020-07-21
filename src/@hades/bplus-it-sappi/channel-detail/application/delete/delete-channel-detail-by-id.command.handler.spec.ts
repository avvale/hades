import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteChannelDetailByIdCommandHandler } from './delete-channel-detail-by-id.command-handler';
import { channelsDetail } from '@hades/bplus-it-sappi/channel-detail/infrastructure/seeds/channel-detail.seed';
import { DeleteChannelDetailByIdCommand } from './delete-channel-detail-by-id.command';
import { DeleteChannelDetailByIdService } from './delete-channel-detail-by-id.service';

describe('DeleteChannelDetailByIdCommandHandler', () => 
{
    let commandHandler: DeleteChannelDetailByIdCommandHandler;
    let service: DeleteChannelDetailByIdService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteChannelDetailByIdCommandHandler,
                {
                    provide: DeleteChannelDetailByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteChannelDetailByIdCommandHandler>(DeleteChannelDetailByIdCommandHandler);
        service         = module.get<DeleteChannelDetailByIdService>(DeleteChannelDetailByIdService);
    });

    describe('main', () => 
    {
        test('DeleteChannelDetailByIdCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteChannelDetailByIdService', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteChannelDetailByIdCommand(
                    channelsDetail[0].id,
                
                )
            )).toBe(undefined);
        });
    });
});