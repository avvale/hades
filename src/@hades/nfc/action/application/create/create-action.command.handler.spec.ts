import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateActionCommandHandler } from './create-action.command-handler';
import { actions } from '@hades/nfc/action/infrastructure/seeds/action.seed';
import { CreateActionCommand } from './create-action.command';
import { CreateActionService } from './create-action.service';

describe('CreateActionCommandHandler', () => 
{
    let commandHandler: CreateActionCommandHandler;
    let service: CreateActionService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateActionCommandHandler,
                {
                    provide: CreateActionService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateActionCommandHandler>(CreateActionCommandHandler);
        service         = module.get<CreateActionService>(CreateActionService);
    });

    describe('main', () => 
    {
        test('CreateActionCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateActionService', async () => 
        {
            expect(await commandHandler.execute(
                new CreateActionCommand(
                    actions[0].id,
                    actions[0].tagId,
                    actions[0].type,
                    actions[0].sectionId,
                    actions[0].data,
                    
                )
            )).toBe(undefined);
        });
    });
});