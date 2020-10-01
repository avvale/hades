import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindUserByIdResolver } from './find-user-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { users } from '@hades/iam/user/infrastructure/seeds/user.seed';

describe('FindUserByIdResolver', () => 
{
    let resolver: FindUserByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindUserByIdResolver,
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

        resolver    = module.get<FindUserByIdResolver>(FindUserByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('FindUserByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('FindUserByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an user by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await resolver.main(users[0].id)).toBe(users[0]);
        });
    });
});