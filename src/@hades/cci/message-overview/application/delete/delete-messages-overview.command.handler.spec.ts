import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteMessagesOverviewCommandHandler } from './delete-messages-overview.command-handler';
import { DeleteMessagesOverviewCommand } from './delete-messages-overview.command';
import { DeleteMessagesOverviewService } from './delete-messages-overview.service';

describe('DeleteMessagesOverviewCommandHandler', () => 
{
    let commandHandler: DeleteMessagesOverviewCommandHandler;
    let service: DeleteMessagesOverviewService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteMessagesOverviewCommandHandler,
                {
                    provide: DeleteMessagesOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteMessagesOverviewCommandHandler>(DeleteMessagesOverviewCommandHandler);
        service         = module.get<DeleteMessagesOverviewService>(DeleteMessagesOverviewService);
    });

    describe('main', () => 
    {
        test('DeleteMessagesOverviewCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteMessagesOverviewCommand()
            )).toBe(undefined);
        });
    });
});