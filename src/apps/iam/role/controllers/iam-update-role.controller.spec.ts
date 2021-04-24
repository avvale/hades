import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateRoleController } from './iam-update-role.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { roles } from '@hades/iam/role/infrastructure/seeds/role.seed';
import { rolesToCreate } from '@hades/iam/role/infrastructure/seeds/roles-to-create.seed';

describe('IamUpdateRoleController', () =>
{
    let controller: IamUpdateRoleController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                IamUpdateRoleController
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

        controller  = module.get<IamUpdateRoleController>(IamUpdateRoleController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamUpdateRoleController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a role created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await controller.main(rolesToCreate[0])).toBe(roles[0]);
        });
    });
});