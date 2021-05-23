import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { messagesOverview } from '@hades/cci/message-overview/infrastructure/seeds/message-overview.seed';
import { CreateMessagesOverviewCommandHandler } from './create-messages-overview.command-handler';
import { CreateMessagesOverviewCommand } from './create-messages-overview.command';
import { CreateMessagesOverviewService } from './create-messages-overview.service';

describe('CreateMessagesOverviewCommandHandler', () =>
{
    let commandHandler: CreateMessagesOverviewCommandHandler;
    let service: CreateMessagesOverviewService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateMessagesOverviewCommandHandler,
                {
                    provide: CreateMessagesOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateMessagesOverviewCommandHandler>(CreateMessagesOverviewCommandHandler);
        service         = module.get<CreateMessagesOverviewService>(CreateMessagesOverviewService);
    });

    describe('main', () =>
    {
        test('CreateMessagesOverviewCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an messageOverview created', async () =>
        {
            expect(await commandHandler.execute(
                new CreateMessagesOverviewCommand(
                    messagesOverview

                )
            )).toBe(undefined);
        });
    });
});