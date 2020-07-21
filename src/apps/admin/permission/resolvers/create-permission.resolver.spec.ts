import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreatePermissionResolver } from './create-permission.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { permissions } from '@hades/admin/permission/infrastructure/seeds/permission.seed';
import { AdminCreatePermissionInput } from './../../../../../src/graphql';

describe('CreatePermissionResolver', () => 
{
    let resolver: CreatePermissionResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreatePermissionResolver,
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

        resolver    = module.get<CreatePermissionResolver>(CreatePermissionResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreatePermissionResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreatePermissionResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an permission created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await resolver.main(<AdminCreatePermissionInput>permissions[0])).toBe(permissions[0]);
        });
    });
});