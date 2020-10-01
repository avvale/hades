import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindAccountByIdResolver } from './find-account-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { accounts } from '@hades/iam/account/infrastructure/seeds/account.seed';

describe('FindAccountByIdResolver', () => 
{
    let resolver: FindAccountByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAccountByIdResolver,
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

        resolver    = module.get<FindAccountByIdResolver>(FindAccountByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('FindAccountByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('FindAccountByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an account by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await resolver.main(accounts[0].id)).toBe(accounts[0]);
        });
    });
});