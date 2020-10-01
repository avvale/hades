import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindUserByIdController } from './find-user-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { users } from '@hades/iam/user/infrastructure/seeds/user.seed';

describe('FindUserByIdController', () => 
{
    let controller: FindUserByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                FindUserByIdController
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

        controller  = module.get<FindUserByIdController>(FindUserByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('FindUserByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an user by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await controller.main(users[0].id)).toBe(users[0]);
        });
    });
});