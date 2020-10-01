import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateUsersResolver } from './paginate-users.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { users } from '@hades/iam/user/infrastructure/seeds/user.seed';

describe('PaginateUsersResolver', () => 
{
    let resolver: PaginateUsersResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateUsersResolver,
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

        resolver    = module.get<PaginateUsersResolver>(PaginateUsersResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('PaginateUsersResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('PaginateUsersResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a users', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(users)));
            expect(await resolver.main()).toBe(users);
        });
    });
});