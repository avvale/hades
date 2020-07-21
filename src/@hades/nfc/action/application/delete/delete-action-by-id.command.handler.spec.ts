import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteActionByIdCommandHandler } from './delete-action-by-id.command-handler';
import { actions } from '@hades/nfc/action/infrastructure/seeds/action.seed';
import { DeleteActionByIdCommand } from './delete-action-by-id.command';
import { DeleteActionByIdService } from './delete-action-by-id.service';

describe('DeleteActionByIdCommandHandler', () => 
{
    let commandHandler: DeleteActionByIdCommandHandler;
    let service: DeleteActionByIdService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteActionByIdCommandHandler,
                {
                    provide: DeleteActionByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteActionByIdCommandHandler>(DeleteActionByIdCommandHandler);
        service         = module.get<DeleteActionByIdService>(DeleteActionByIdService);
    });

    describe('main', () => 
    {
        test('DeleteActionByIdCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteActionByIdService', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteActionByIdCommand(
                    actions[0].id,
                
                )
            )).toBe(undefined);
        });
    });
});