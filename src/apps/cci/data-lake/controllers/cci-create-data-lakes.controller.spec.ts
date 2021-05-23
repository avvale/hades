import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateDataLakesController } from './cci-create-data-lakes.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { dataLakes } from '@hades/cci/data-lake/infrastructure/seeds/data-lake.seed';

describe('CciCreateDataLakesController', () =>
{
    let controller: CciCreateDataLakesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciCreateDataLakesController
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

        controller  = module.get<CciCreateDataLakesController>(CciCreateDataLakesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CciCreateDataLakesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an dataLakes created', async () =>
        {
            expect(await controller.main(dataLakes)).toBe(undefined);
        });
    });
});