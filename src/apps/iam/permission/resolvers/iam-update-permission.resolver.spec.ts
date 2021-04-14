import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdatePermissionResolver } from './iam-update-permission.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { permissions } from '@hades/iam/permission/infrastructure/seeds/permission.seed';
import { IamUpdatePermissionInput } from './../../../../graphql';

describe('IamUpdatePermissionResolver', () =>
{
    let resolver: IamUpdatePermissionResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdatePermissionResolver,
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

        resolver  = module.get<IamUpdatePermissionResolver>(IamUpdatePermissionResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamUpdatePermissionResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdatePermissionResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a permission created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await resolver.main(<IamUpdatePermissionInput>permissions[0])).toBe(permissions[0]);
        });
    });
});