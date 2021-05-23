import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciGetDataLakesController } from './cci-get-data-lakes.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { dataLakes } from '@hades/cci/data-lake/infrastructure/seeds/data-lake.seed';

describe('CciGetDataLakesController', () =>
{
    let controller: CciGetDataLakesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciGetDataLakesController
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

        controller  = module.get<CciGetDataLakesController>(CciGetDataLakesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CciGetDataLakesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a dataLakes', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(dataLakes)));
            expect(await controller.main()).toBe(dataLakes);
        });
    });
});