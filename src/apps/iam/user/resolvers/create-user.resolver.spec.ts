import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateUserResolver } from './create-user.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { users } from '@hades/iam/user/infrastructure/seeds/user.seed';
import { IamCreateUserInput } from './../../../../graphql';

describe('CreateUserResolver', () => 
{
    let resolver: CreateUserResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateUserResolver,
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

        resolver    = module.get<CreateUserResolver>(CreateUserResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateUserResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateUserResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an user created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await resolver.main(<IamCreateUserInput>users[0])).toBe(users[0]);
        });
    });
});