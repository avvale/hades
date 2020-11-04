import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciPaginateSystemsController } from './cci-paginate-systems.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { systems } from '@hades/cci/system/infrastructure/seeds/system.seed';

describe('CciPaginateSystemsController', () => 
{
    let controller: CciPaginateSystemsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CciPaginateSystemsController
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

        controller  = module.get<CciPaginateSystemsController>(CciPaginateSystemsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CciPaginateSystemsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a systems', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(systems)));
            expect(await controller.main()).toBe(systems);
        });
    });
});