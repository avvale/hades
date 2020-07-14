import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertFlowsController } from './insert-flows.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { flows } from '@hades/bplus-it-sappi/flow/infrastructure/seeds/flow.seed';

describe('InsertFlowsController', () => 
{
    let controller: InsertFlowsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                InsertFlowsController
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

        controller  = module.get<InsertFlowsController>(InsertFlowsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertFlowsController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertFlowsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an flows created', async () => 
        {
            expect(await controller.main(flows)).toBe(undefined);
        });
    });
});