import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteMessagesDetailCommandHandler } from './delete-messages-detail.command-handler';
import { DeleteMessagesDetailCommand } from './delete-messages-detail.command';
import { DeleteMessagesDetailService } from './delete-messages-detail.service';

describe('DeleteMessagesDetailCommandHandler', () => 
{
    let commandHandler: DeleteMessagesDetailCommandHandler;
    let service: DeleteMessagesDetailService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteMessagesDetailCommandHandler,
                {
                    provide: DeleteMessagesDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteMessagesDetailCommandHandler>(DeleteMessagesDetailCommandHandler);
        service         = module.get<DeleteMessagesDetailService>(DeleteMessagesDetailService);
    });

    describe('main', () => 
    {
        test('DeleteMessagesDetailCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteMessagesDetailCommand()
            )).toBe(undefined);
        });
    });
});