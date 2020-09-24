import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateUsersResolver } from './create-users.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { users } from '@hades/iam/user/infrastructure/seeds/user.seed';
import { IamCreateUserInput } from './../../../../graphql';

describe('CreateUsersResolver', () => 
{
    let resolver: CreateUsersResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateUsersResolver,
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

        resolver    = module.get<CreateUsersResolver>(CreateUsersResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateUsersResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateUsersResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an users created', async () => 
        {
            expect(await resolver.main(<IamCreateUserInput[]>users)).toBe(true);
        });
    });
});