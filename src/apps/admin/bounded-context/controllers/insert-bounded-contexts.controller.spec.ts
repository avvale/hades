import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertBoundedContextsController } from './insert-bounded-contexts.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { boundedContexts } from '@hades/admin/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('InsertBoundedContextsController', () => 
{
    let controller: InsertBoundedContextsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                InsertBoundedContextsController
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

        controller  = module.get<InsertBoundedContextsController>(InsertBoundedContextsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertBoundedContextsController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertBoundedContextsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an boundedContexts created', async () => 
        {
            expect(await controller.main(boundedContexts)).toBe(undefined);
        });
    });
});