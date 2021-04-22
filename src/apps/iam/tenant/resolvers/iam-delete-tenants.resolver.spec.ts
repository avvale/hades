// ignored file
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteTenantsResolver } from './iam-delete-tenants.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { tenants } from '@hades/iam/tenant/infrastructure/seeds/tenant.seed';
import { GetAccountsQuery } from '@hades/iam/account/application/get/get-accounts.query';
import { accounts } from '@hades/iam/account/infrastructure/seeds/account.seed';

describe('IamDeleteTenantsResolver', () =>
{
    let resolver: IamDeleteTenantsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteTenantsResolver,
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

        resolver    = module.get<IamDeleteTenantsResolver>(IamDeleteTenantsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamDeleteTenantsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeleteTenantsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an tenants deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation((query) =>
            {
                // check query type to return data
                return new Promise(resolve =>
                {
                    if (query instanceof GetAccountsQuery) resolve(accounts); // return accounts
                    resolve(tenants); // return tenants
                });
            });
            expect(await resolver.main()).toBe(tenants);
        });
    });
});