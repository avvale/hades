import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreatePermissionsResolver } from './create-permissions.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { permissions } from '@hades/iam/permission/infrastructure/seeds/permission.seed';
import { IamCreatePermissionInput } from './../../../../graphql';

describe('CreatePermissionsResolver', () => 
{
    let resolver: CreatePermissionsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreatePermissionsResolver,
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

        resolver    = module.get<CreatePermissionsResolver>(CreatePermissionsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreatePermissionsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreatePermissionsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an permissions created', async () => 
        {
            expect(await resolver.main(<IamCreatePermissionInput[]>permissions)).toBe(true);
        });
    });
});