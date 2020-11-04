import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciFindFlowController } from './cci-find-flow.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { flows } from '@hades/cci/flow/infrastructure/seeds/flow.seed';

describe('CciFindFlowController', () => 
{
    let controller: CciFindFlowController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciFindFlowController
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

        controller  = module.get<CciFindFlowController>(CciFindFlowController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CciFindFlowController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a flow', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(flows[0])));
            expect(await controller.main()).toBe(flows[0]);
        });
    });
});