import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciUpdateFlowController } from './cci-update-flow.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { flows } from '@hades/cci/flow/infrastructure/seeds/flow.seed';

describe('CciUpdateFlowController', () => 
{
    let controller: CciUpdateFlowController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciUpdateFlowController
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

        controller  = module.get<CciUpdateFlowController>(CciUpdateFlowController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CciUpdateFlowController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a flow created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(flows[0])));
            expect(await controller.main(flows[0])).toBe(flows[0]);
        });
    });
});