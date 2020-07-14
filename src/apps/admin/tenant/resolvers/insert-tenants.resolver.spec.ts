import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertTenantsResolver } from './insert-tenants.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { tenants } from '@hades/admin/tenant/infrastructure/seeds/tenant.seed';
import { AdminCreateTenantInput } from './../../../../../src/graphql';

describe('InsertTenantsResolver', () => 
{
    let resolver: InsertTenantsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertTenantsResolver,
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

        resolver    = module.get<InsertTenantsResolver>(InsertTenantsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertTenantsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertTenantsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an tenants created', async () => 
        {
            expect(await resolver.main(<AdminCreateTenantInput[]>tenants)).toBe(true);
        });
    });
});