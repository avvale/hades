import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateTenantResolver } from './update-tenant.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { tenants } from '@hades/admin/tenant/infrastructure/seeds/tenant.seed';
import { AdminUpdateTenantInput } from './../../../../../src/graphql';

describe('UpdateTenantResolver', () => 
{
    let resolver: UpdateTenantResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateTenantResolver,
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

        resolver  = module.get<UpdateTenantResolver>(UpdateTenantResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('UpdateTenantResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('UpdateTenantResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a tenant created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await resolver.main(<AdminUpdateTenantInput>tenants[0])).toBe(tenants[0]);
        });
    });
});