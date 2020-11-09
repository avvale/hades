import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamPaginateBoundedContextsController } from './iam-paginate-bounded-contexts.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { boundedContexts } from '@hades/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamPaginateBoundedContextsController', () => 
{
    let controller: IamPaginateBoundedContextsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                IamPaginateBoundedContextsController
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

        controller  = module.get<IamPaginateBoundedContextsController>(IamPaginateBoundedContextsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('IamPaginateBoundedContextsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a boundedContexts', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(boundedContexts)));
            expect(await controller.main()).toBe(boundedContexts);
        });
    });
});