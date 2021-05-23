// ignored file
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteTenantByIdResolver } from './iam-delete-tenant-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { tenants } from '@hades/iam/tenant/infrastructure/seeds/tenant.seed';
import { accounts } from '@hades/iam/account/infrastructure/seeds/account.seed';
import { GetAccountsQuery } from '@hades/iam/account/application/get/get-accounts.query';

describe('IamDeleteTenantByIdResolver', () =>
{
    let resolver: IamDeleteTenantByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteTenantByIdResolver,
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

        resolver    = module.get<IamDeleteTenantByIdResolver>(IamDeleteTenantByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamDeleteTenantByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeleteTenantByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an tenant deleted', async () =>
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
            expect(await resolver.main(tenants[0].id)).toBe(tenants[0]);
        });
    });
});