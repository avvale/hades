import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteMessageDetailByIdCommandHandler } from './delete-message-detail-by-id.command-handler';
import { messagesDetail } from '@hades/bplus-it-sappi/message-detail/infrastructure/seeds/message-detail.seed';
import { DeleteMessageDetailByIdCommand } from './delete-message-detail-by-id.command';
import { DeleteMessageDetailByIdService } from './delete-message-detail-by-id.service';

describe('DeleteMessageDetailByIdCommandHandler', () => 
{
    let commandHandler: DeleteMessageDetailByIdCommandHandler;
    let service: DeleteMessageDetailByIdService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteMessageDetailByIdCommandHandler,
                {
                    provide: DeleteMessageDetailByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteMessageDetailByIdCommandHandler>(DeleteMessageDetailByIdCommandHandler);
        service         = module.get<DeleteMessageDetailByIdService>(DeleteMessageDetailByIdService);
    });

    describe('main', () => 
    {
        test('DeleteMessageDetailByIdCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteMessageDetailByIdService', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteMessageDetailByIdCommand(
                    messagesDetail[0].id,
                
                )
            )).toBe(undefined);
        });
    });
});