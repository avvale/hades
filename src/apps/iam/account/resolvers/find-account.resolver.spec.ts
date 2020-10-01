import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindAccountResolver } from './find-account.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { accounts } from '@hades/iam/account/infrastructure/seeds/account.seed';

describe('FindAccountResolver', () => 
{
    let resolver: FindAccountResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAccountResolver,
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

        resolver    = module.get<FindAccountResolver>(FindAccountResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('FindAccountResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('FindAccountResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a account', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await resolver.main()).toBe(accounts[0]);
        });
    });
});