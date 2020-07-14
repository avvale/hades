import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertPermissionsResolver } from './insert-permissions.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { permissions } from '@hades/admin/permission/infrastructure/seeds/permission.seed';
import { AdminCreatePermissionInput } from './../../../../../src/graphql';

describe('InsertPermissionsResolver', () => 
{
    let resolver: InsertPermissionsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertPermissionsResolver,
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

        resolver    = module.get<InsertPermissionsResolver>(InsertPermissionsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertPermissionsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertPermissionsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an permissions created', async () => 
        {
            expect(await resolver.main(<AdminCreatePermissionInput[]>permissions)).toBe(true);
        });
    });
});