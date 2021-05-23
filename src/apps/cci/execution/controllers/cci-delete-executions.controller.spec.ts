import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciDeleteExecutionsController } from './cci-delete-executions.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { executions } from '@hades/cci/execution/infrastructure/seeds/execution.seed';

describe('CciDeleteExecutionsController', () =>
{
    let controller: CciDeleteExecutionsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciDeleteExecutionsController
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

        controller  = module.get<CciDeleteExecutionsController>(CciDeleteExecutionsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CciDeleteExecutionsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an executions deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(executions)));
            expect(await controller.main()).toBe(executions);
        });
    });
});