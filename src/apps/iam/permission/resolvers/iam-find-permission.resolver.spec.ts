import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindPermissionResolver } from './iam-find-permission.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { permissions } from '@hades/iam/permission/infrastructure/seeds/permission.seed';

describe('IamFindPermissionResolver', () => 
{
    let resolver: IamFindPermissionResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamFindPermissionResolver,
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

        resolver    = module.get<IamFindPermissionResolver>(IamFindPermissionResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamFindPermissionResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('IamFindPermissionResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a permission', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await resolver.main()).toBe(permissions[0]);
        });
    });
});