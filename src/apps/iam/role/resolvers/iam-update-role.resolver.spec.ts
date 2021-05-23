// ignored file
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateRoleResolver } from './iam-update-role.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { roles } from '@hades/iam/role/infrastructure/seeds/role.seed';
import { rolesToCreate } from '@hades/iam/role/infrastructure/seeds/roles-to-create.seed';
import { accounts } from '@hades/iam/account/infrastructure/seeds/account.seed';
import { IamUpdateRoleInput } from './../../../../graphql';
import { GetAccountsQuery } from '@hades/iam/account/application/get/get-accounts.query';
import { GetPermissionsQuery } from '@hades/iam/permission/application/get/get-permissions.query';
import { permissions } from '@hades/iam/permission/infrastructure/seeds/permission.seed';
import { FindRoleByIdQuery } from '@hades/iam/role/application/find/find-role-by-id.query';

describe('IamUpdateRoleResolver', () =>
{
    let resolver: IamUpdateRoleResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateRoleResolver,
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

        resolver    = module.get<IamUpdateRoleResolver>(IamUpdateRoleResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamUpdateRoleResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateRoleResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a role created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation((query) =>
            {
                // check query type to return data
                return new Promise(resolve =>
                {
                    if (query instanceof GetAccountsQuery) resolve(accounts); // return accounts
                    if (query instanceof GetPermissionsQuery) resolve(permissions); // return permissions
                    if (query instanceof FindRoleByIdQuery) resolve(roles[0]); // return role
                    resolve(false);
                });
            });
            expect(await resolver.main(<IamUpdateRoleInput>rolesToCreate[0])).toBe(roles[0]);
        });
    });
});