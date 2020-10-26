import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindPermissionByIdController } from './iam-find-permission-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { permissions } from '@hades/iam/permission/infrastructure/seeds/permission.seed';

describe('IamFindPermissionByIdController', () => 
{
    let controller: IamFindPermissionByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                IamFindPermissionByIdController
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

        controller  = module.get<IamFindPermissionByIdController>(IamFindPermissionByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('IamFindPermissionByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an permission by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await controller.main(permissions[0].id)).toBe(permissions[0]);
        });
    });
});