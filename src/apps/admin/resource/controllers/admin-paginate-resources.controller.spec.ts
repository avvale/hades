import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AdminPaginateResourcesController } from './admin-paginate-resources.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';

describe('AdminPaginateResourcesController', () =>
{
    let controller: AdminPaginateResourcesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                AdminPaginateResourcesController
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

        controller  = module.get<AdminPaginateResourcesController>(AdminPaginateResourcesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('AdminPaginateResourcesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a resources', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(resources)));
            expect(await controller.main()).toBe(resources);
        });
    });
});