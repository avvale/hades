// ignored file
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateTenantResolver } from './iam-update-tenant.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { tenants } from '@hades/iam/tenant/infrastructure/seeds/tenant.seed';
import { GetAccountsQuery } from '@hades/iam/account/application/get/get-accounts.query';
import { accounts } from '@hades/iam/account/infrastructure/seeds/account.seed';
import { IamUpdateTenantInput } from './../../../../graphql';

describe('IamUpdateTenantResolver', () =>
{
    let resolver: IamUpdateTenantResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateTenantResolver,
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

        resolver    = module.get<IamUpdateTenantResolver>(IamUpdateTenantResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamUpdateTenantResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateTenantResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a tenant created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation((query) =>
            {
                // check query type to return data
                return new Promise(resolve =>
                {
                    if (query instanceof GetAccountsQuery) resolve(accounts); // return accounts
                    resolve(tenants[0]); // return tenant
                });
            });
            expect(await resolver.main(<IamUpdateTenantInput>tenants[0])).toBe(tenants[0]);
        });
    });
});