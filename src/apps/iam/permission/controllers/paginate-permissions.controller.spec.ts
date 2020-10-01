import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginatePermissionsController } from './paginate-permissions.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { permissions } from '@hades/iam/permission/infrastructure/seeds/permission.seed';

describe('PaginatePermissionsController', () => 
{
    let controller: PaginatePermissionsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                PaginatePermissionsController
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

        controller  = module.get<PaginatePermissionsController>(PaginatePermissionsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('PaginatePermissionsController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a permissions', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(permissions)));
            expect(await controller.main()).toBe(permissions);
        });
    });
});