import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateActionController } from './create-action.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { actions } from '@hades/nfc/action/infrastructure/seeds/action.seed';

describe('CreateActionController', () => 
{
    let controller: CreateActionController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CreateActionController
            ],
            providers: [
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {},
                    }
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {},
                    }
                },
            ]
        }).compile();

        controller  = module.get<CreateActionController>(CreateActionController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('CreateActionController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('CreateActionController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an action created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(actions[0])));
            expect(await controller.main(actions[0])).toBe(actions[0]);
        });
    });
});