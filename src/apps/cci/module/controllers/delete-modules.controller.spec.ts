import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteModulesController } from './delete-modules.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { modules } from '@hades/cci/module/infrastructure/seeds/module.seed';

describe('DeleteModulesController', () => 
{
    let controller: DeleteModulesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                DeleteModulesController
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

        controller  = module.get<DeleteModulesController>(DeleteModulesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('DeleteModulesController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an modules deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(modules)));
            expect(await controller.main()).toBe(modules);
        });
    });
});