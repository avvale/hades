// ignored file
import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';

// custom items
import { IamCreateAccountResolver } from './iam-create-account.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { accounts } from '@hades/iam/account/infrastructure/seeds/account.seed';
import { clients } from '@hades/o-auth/client/infrastructure/seeds/client.seed';
import { roles } from '@hades/iam/role/infrastructure/seeds/role.seed';
import { IamCreateAccountInput } from './../../../../graphql';
import { FindClientQuery } from '@hades/o-auth/client/application/find/find-client.query';
import { GetRolesQuery } from '@hades/iam/role/application/get/get-roles.query';

describe('IamCreateAccountResolver', () =>
{
    let resolver: IamCreateAccountResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: '1234567890'
                }),
            ],
            providers: [
                IamCreateAccountResolver,
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

        resolver    = module.get<IamCreateAccountResolver>(IamCreateAccountResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamCreateAccountResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreateAccountResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an account created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation((query) =>
            {
                // check query type to return data
                return new Promise(resolve =>
                {
                    if (query instanceof FindClientQuery) resolve(clients[0]); // return client
                    if (query instanceof GetRolesQuery) resolve(roles); // return roles
                    resolve(accounts); // return accounts
                });
            });
            expect(await resolver.main(<IamCreateAccountInput>accounts[0], {
                req: {
                    headers: {
                        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImppdCI6IjE1MjQifQ.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.oDME4U1e7-hco5Nyx2pUlO53jcm7x3zakYHWpnHUHzI'
                    }
                }
            }))
            .toBe(accounts[0]);
        });
    });
});