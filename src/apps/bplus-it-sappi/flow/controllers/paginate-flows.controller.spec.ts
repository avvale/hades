import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateFlowsController } from './paginate-flows.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { flows } from '@hades/bplus-it-sappi/flow/infrastructure/seeds/flow.seed'

describe('PaginateFlowsController', () => 
{
    let controller: PaginateFlowsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                PaginateFlowsController
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

        controller  = module.get<PaginateFlowsController>(PaginateFlowsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('PaginateFlowsController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('PaginateFlowsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a flows', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(flows)));
            expect(await controller.main([], [])).toBe(flows);
        });
    });
});