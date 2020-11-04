import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciFindModuleByIdController } from './cci-find-module-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { modules } from '@hades/cci/module/infrastructure/seeds/module.seed';

describe('CciFindModuleByIdController', () => 
{
    let controller: CciFindModuleByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciFindModuleByIdController
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

        controller  = module.get<CciFindModuleByIdController>(CciFindModuleByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CciFindModuleByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an module by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(modules[0])));
            expect(await controller.main(modules[0].id)).toBe(modules[0]);
        });
    });
});