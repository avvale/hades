import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateTenantsResolver } from './create-tenants.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { tenants } from '@hades/admin/tenant/infrastructure/seeds/tenant.seed';
import { AdminCreateTenantInput } from './../../../../graphql';

describe('CreateTenantsResolver', () => 
{
    let resolver: CreateTenantsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateTenantsResolver,
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

        resolver    = module.get<CreateTenantsResolver>(CreateTenantsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateTenantsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateTenantsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an tenants created', async () => 
        {
            expect(await resolver.main(<AdminCreateTenantInput[]>tenants)).toBe(true);
        });
    });
});