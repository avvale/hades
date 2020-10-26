import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreatePermissionsResolver } from './iam-create-permissions.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { permissions } from '@hades/iam/permission/infrastructure/seeds/permission.seed';
import { IamCreatePermissionInput } from './../../../../graphql';

describe('IamCreatePermissionsResolver', () => 
{
    let resolver: IamCreatePermissionsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreatePermissionsResolver,
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

        resolver    = module.get<IamCreatePermissionsResolver>(IamCreatePermissionsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamCreatePermissionsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('IamCreatePermissionsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an permissions created', async () => 
        {
            expect(await resolver.main(<IamCreatePermissionInput[]>permissions)).toBe(true);
        });
    });
});