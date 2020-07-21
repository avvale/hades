import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteActionsCommandHandler } from './delete-actions.command-handler';
import { DeleteActionsCommand } from './delete-actions.command';
import { DeleteActionsService } from './delete-actions.service';

describe('DeleteActionsCommandHandler', () => 
{
    let commandHandler: DeleteActionsCommandHandler;
    let service: DeleteActionsService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteActionsCommandHandler,
                {
                    provide: DeleteActionsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteActionsCommandHandler>(DeleteActionsCommandHandler);
        service         = module.get<DeleteActionsService>(DeleteActionsService);
    });

    describe('main', () => 
    {
        test('DeleteActionsCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteActionsCommand()
            )).toBe(undefined);
        });
    });
});