import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertDataLakesController } from './insert-data-lakes.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { dataLakes } from '@hades/bplus-it-sappi/data-lake/infrastructure/seeds/data-lake.seed'

describe('InsertDataLakesController', () => 
{
    let controller: InsertDataLakesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                InsertDataLakesController
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

        controller  = module.get<InsertDataLakesController>(InsertDataLakesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertDataLakesController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertDataLakesController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return an dataLakes created', async () => 
        {
            expect(await controller.main(dataLakes)).toBe(undefined);
        });
    });
});