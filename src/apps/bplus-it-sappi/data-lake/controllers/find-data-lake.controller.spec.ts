import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindDataLakeController } from './find-data-lake.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { dataLakes } from '@hades/bplus-it-sappi/data-lake/infrastructure/seeds/data-lake.seed';

describe('FindDataLakeController', () => 
{
    let controller: FindDataLakeController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                FindDataLakeController
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

        controller  = module.get<FindDataLakeController>(FindDataLakeController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindDataLakeController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindDataLakeController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a dataLake', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(dataLakes[0])));
            expect(await controller.main([])).toBe(dataLakes[0]);
        });
    });
});