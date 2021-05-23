import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciDeleteFlowsController } from './cci-delete-flows.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { flows } from '@hades/cci/flow/infrastructure/seeds/flow.seed';

describe('CciDeleteFlowsController', () =>
{
    let controller: CciDeleteFlowsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciDeleteFlowsController
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

        controller  = module.get<CciDeleteFlowsController>(CciDeleteFlowsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CciDeleteFlowsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an flows deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(flows)));
            expect(await controller.main()).toBe(flows);
        });
    });
});