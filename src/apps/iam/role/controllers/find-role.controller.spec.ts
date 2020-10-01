import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindRoleController } from './find-role.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { roles } from '@hades/iam/role/infrastructure/seeds/role.seed';

describe('FindRoleController', () => 
{
    let controller: FindRoleController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                FindRoleController
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

        controller  = module.get<FindRoleController>(FindRoleController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('FindRoleController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a role', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await controller.main()).toBe(roles[0]);
        });
    });
});