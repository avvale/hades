import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteActionByIdController } from './delete-action-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { actions } from '@hades/nfc/action/infrastructure/seeds/action.seed';

describe('DeleteActionByIdController', () => 
{
    let controller: DeleteActionByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteActionByIdController
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

        controller  = module.get<DeleteActionByIdController>(DeleteActionByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('DeleteActionByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an action deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(actions[0])));
            expect(await controller.main(actions[0].id)).toBe(actions[0]);
        });
    });
});