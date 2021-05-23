import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateExecutionsController } from './cci-create-executions.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { executions } from '@hades/cci/execution/infrastructure/seeds/execution.seed';

describe('CciCreateExecutionsController', () =>
{
    let controller: CciCreateExecutionsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciCreateExecutionsController
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

        controller  = module.get<CciCreateExecutionsController>(CciCreateExecutionsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CciCreateExecutionsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an executions created', async () =>
        {
            expect(await controller.main(executions)).toBe(undefined);
        });
    });
});