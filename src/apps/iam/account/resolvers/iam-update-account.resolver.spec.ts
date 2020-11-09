import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateAccountResolver } from './iam-update-account.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { accounts } from '@hades/iam/account/infrastructure/seeds/account.seed';
import { IamUpdateAccountInput } from './../../../../graphql';

describe('IamUpdateAccountResolver', () => 
{
    let resolver: IamUpdateAccountResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateAccountResolver,
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

        resolver  = module.get<IamUpdateAccountResolver>(IamUpdateAccountResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamUpdateAccountResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('IamUpdateAccountResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a account created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await resolver.main(<IamUpdateAccountInput>accounts[0])).toBe(accounts[0]);
        });
    });
});