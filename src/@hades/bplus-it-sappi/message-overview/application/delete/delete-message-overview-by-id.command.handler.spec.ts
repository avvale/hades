import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteMessageOverviewByIdCommandHandler } from './delete-message-overview-by-id.command-handler';
import { messagesOverview } from '@hades/bplus-it-sappi/message-overview/infrastructure/seeds/message-overview.seed';
import { DeleteMessageOverviewByIdCommand } from './delete-message-overview-by-id.command';
import { DeleteMessageOverviewByIdService } from './delete-message-overview-by-id.service';

describe('DeleteMessageOverviewByIdCommandHandler', () => 
{
    let commandHandler: DeleteMessageOverviewByIdCommandHandler;
    let service: DeleteMessageOverviewByIdService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteMessageOverviewByIdCommandHandler,
                {
                    provide: DeleteMessageOverviewByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteMessageOverviewByIdCommandHandler>(DeleteMessageOverviewByIdCommandHandler);
        service         = module.get<DeleteMessageOverviewByIdService>(DeleteMessageOverviewByIdService);
    });

    describe('main', () => 
    {
        test('DeleteMessageOverviewByIdCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteMessageOverviewByIdService', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteMessageOverviewByIdCommand(
                    messagesOverview[0].id,
                
                )
            )).toBe(undefined);
        });
    });
});