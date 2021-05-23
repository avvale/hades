import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciFindDataLakeByIdController } from './cci-find-data-lake-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { dataLakes } from '@hades/cci/data-lake/infrastructure/seeds/data-lake.seed';

describe('CciFindDataLakeByIdController', () =>
{
    let controller: CciFindDataLakeByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciFindDataLakeByIdController
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

        controller  = module.get<CciFindDataLakeByIdController>(CciFindDataLakeByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CciFindDataLakeByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an dataLake by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(dataLakes[0])));
            expect(await controller.main(dataLakes[0].id)).toBe(dataLakes[0]);
        });
    });
});