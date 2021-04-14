import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateRoleResolver } from './iam-update-role.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { roles } from '@hades/iam/role/infrastructure/seeds/role.seed';
import { IamUpdateRoleInput } from './../../../../graphql';

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

        resolver  = module.get<IamUpdateRoleResolver>(IamUpdateRoleResolver);
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
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(roles[0])));
            expect(await resolver.main(<IamUpdateRoleInput>roles[0])).toBe(roles[0]);
        });
    });
});