import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { messagesDetail } from '@hades/cci/message-detail/infrastructure/seeds/message-detail.seed';
import { CreateMessagesDetailCommandHandler } from './create-messages-detail.command-handler';
import { CreateMessagesDetailCommand } from './create-messages-detail.command';
import { CreateMessagesDetailService } from './create-messages-detail.service';

describe('CreateMessagesDetailCommandHandler', () =>
{
    let commandHandler: CreateMessagesDetailCommandHandler;
    let service: CreateMessagesDetailService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateMessagesDetailCommandHandler,
                {
                    provide: CreateMessagesDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateMessagesDetailCommandHandler>(CreateMessagesDetailCommandHandler);
        service         = module.get<CreateMessagesDetailService>(CreateMessagesDetailService);
    });

    describe('main', () =>
    {
        test('CreateMessagesDetailCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an messageDetail created', async () =>
        {
            expect(await commandHandler.execute(
                new CreateMessagesDetailCommand(
                    messagesDetail

                )
            )).toBe(undefined);
        });
    });
});