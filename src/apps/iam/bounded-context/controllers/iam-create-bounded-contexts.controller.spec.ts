import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateBoundedContextsController } from './iam-create-bounded-contexts.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { boundedContexts } from '@hades/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamCreateBoundedContextsController', () =>
{
    let controller: IamCreateBoundedContextsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                IamCreateBoundedContextsController
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

        controller  = module.get<IamCreateBoundedContextsController>(IamCreateBoundedContextsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamCreateBoundedContextsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an boundedContexts created', async () =>
        {
            expect(await controller.main(boundedContexts)).toBe(undefined);
        });
    });
});