import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetTenantsQueryHandler } from './get-tenants.query-handler';
import { MockTenantRepository } from '@hades/admin/tenant/infrastructure/mock/mock-tenant.repository';
import { ITenantRepository } from '@hades/admin/tenant/domain/tenant.repository';
import { TenantMapper } from '@hades/admin/tenant/domain/tenant.mapper';
import { GetTenantsQuery } from './get-tenants.query';
import { GetTenantsService } from './get-tenants.service';

describe('GetTenantsQueryHandler', () => 
{
    let queryHandler: GetTenantsQueryHandler;
    let service: GetTenantsService;
    let repository: MockTenantRepository;
    let mapper: TenantMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetTenantsQueryHandler,
                {
                    provide: ITenantRepository,
                    useClass: MockTenantRepository
                },
                {
                    provide: GetTenantsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetTenantsQueryHandler>(GetTenantsQueryHandler);
        service         = module.get<GetTenantsService>(GetTenantsService);
        repository      = <MockTenantRepository>module.get<ITenantRepository>(ITenantRepository);
        mapper          = new TenantMapper();
    });

    describe('main', () => 
    {
        test('GetTenantsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an tenants founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetTenantsQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});