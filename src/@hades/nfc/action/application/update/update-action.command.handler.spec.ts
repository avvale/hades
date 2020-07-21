import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateActionCommandHandler } from './update-action.command-handler';
import { actions } from '@hades/nfc/action/infrastructure/seeds/action.seed';
import { UpdateActionCommand } from './update-action.command';
import { UpdateActionService } from './update-action.service';

describe('UpdateActionCommandHandler', () => 
{
    let commandHandler: UpdateActionCommandHandler;
    let service: UpdateActionService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateActionCommandHandler,
                {
                    provide: UpdateActionService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateActionCommandHandler>(UpdateActionCommandHandler);
        service         = module.get<UpdateActionService>(UpdateActionService);
    });

    describe('main', () => 
    {
        test('UpdateActionCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an action created', async () => 
        {
            expect(await commandHandler.execute(
                new UpdateActionCommand(
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