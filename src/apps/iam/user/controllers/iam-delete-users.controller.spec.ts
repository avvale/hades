import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteUsersController } from './iam-delete-users.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { users } from '@hades/iam/user/infrastructure/seeds/user.seed';

describe('IamDeleteUsersController', () => 
{
    let controller: IamDeleteUsersController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                IamDeleteUsersController
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

        controller  = module.get<IamDeleteUsersController>(IamDeleteUsersController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('IamDeleteUsersController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an users deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(users)));
            expect(await controller.main()).toBe(users);
        });
    });
});