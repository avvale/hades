import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteUsersResolver } from './iam-delete-users.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { users } from '@hades/iam/user/infrastructure/seeds/user.seed';

describe('IamDeleteUsersResolver', () =>
{
    let resolver: IamDeleteUsersResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteUsersResolver,
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

        resolver    = module.get<IamDeleteUsersResolver>(IamDeleteUsersResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamDeleteUsersResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeleteUsersResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an users deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(users)));
            expect(await resolver.main()).toBe(users);
        });
    });
});