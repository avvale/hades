import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateActionsCommandHandler } from './create-actions.command-handler';
import { actions } from '@hades/nfc/action/infrastructure/seeds/action.seed';
import { CreateActionsCommand } from './create-actions.command';
import { CreateActionsService } from './create-actions.service';

describe('CreateActionsCommandHandler', () => 
{
    let commandHandler: CreateActionsCommandHandler;
    let service: CreateActionsService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateActionsCommandHandler,
                {
                    provide: CreateActionsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateActionsCommandHandler>(CreateActionsCommandHandler);
        service         = module.get<CreateActionsService>(CreateActionsService);
    });

    describe('main', () => 
    {
        test('CreateActionsCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an action created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateActionsCommand(
                    actions
                
                )
            )).toBe(undefined);
        });
    });
});