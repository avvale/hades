import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciFindSystemByIdController } from './cci-find-system-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { systems } from '@hades/cci/system/infrastructure/seeds/system.seed';

describe('CciFindSystemByIdController', () => 
{
    let controller: CciFindSystemByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciFindSystemByIdController
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

        controller  = module.get<CciFindSystemByIdController>(CciFindSystemByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CciFindSystemByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an system by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(systems[0])));
            expect(await controller.main(systems[0].id)).toBe(systems[0]);
        });
    });
});