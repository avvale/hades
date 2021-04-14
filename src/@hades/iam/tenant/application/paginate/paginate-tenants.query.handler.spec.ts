import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateTenantsQueryHandler } from './paginate-tenants.query-handler';
import { MockTenantRepository } from '@hades/iam/tenant/infrastructure/mock/mock-tenant.repository';
import { ITenantRepository } from '@hades/iam/tenant/domain/tenant.repository';
import { TenantMapper } from '@hades/iam/tenant/domain/tenant.mapper';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateTenantsQuery } from './paginate-tenants.query';
import { PaginateTenantsService } from './paginate-tenants.service';

describe('PaginateTenantsQueryHandler', () =>
{
    let queryHandler: PaginateTenantsQueryHandler;
    let service: PaginateTenantsService;
    let repository: MockTenantRepository;
    let mapper: TenantMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateTenantsQueryHandler,
                {
                    provide: ITenantRepository,
                    useClass: MockTenantRepository
                },
                {
                    provide: PaginateTenantsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateTenantsQueryHandler>(PaginateTenantsQueryHandler);
        service         = module.get<PaginateTenantsService>(PaginateTenantsService);
        repository      = <MockTenantRepository>module.get<ITenantRepository>(ITenantRepository);
        mapper          = new TenantMapper();
    });

    describe('main', () =>
    {
        test('PaginateTenantsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an tenants paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateTenantsQuery(
                    {
                        offset: 0,
                        limit: 10
                    }
                )
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO())
                )
            );
        });
    });
});