import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetFlowsController } from './get-flows.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { flows } from '@hades/bplus-it-sappi/flow/infrastructure/seeds/flow.seed';

describe('GetFlowsController', () => 
{
    let controller: GetFlowsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                GetFlowsController
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

        controller  = module.get<GetFlowsController>(GetFlowsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('GetFlowsController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('GetFlowsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a flows', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(flows)));
            expect(await controller.main([])).toBe(flows);
        });
    });
});