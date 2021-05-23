import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateResourcesQueryHandler } from './paginate-resources.query-handler';
import { MockResourceRepository } from '@hades/admin/resource/infrastructure/mock/mock-resource.repository';
import { IResourceRepository } from '@hades/admin/resource/domain/resource.repository';
import { ResourceMapper } from '@hades/admin/resource/domain/resource.mapper';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateResourcesQuery } from './paginate-resources.query';
import { PaginateResourcesService } from './paginate-resources.service';

describe('PaginateResourcesQueryHandler', () =>
{
    let queryHandler: PaginateResourcesQueryHandler;
    let service: PaginateResourcesService;
    let repository: MockResourceRepository;
    let mapper: ResourceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateResourcesQueryHandler,
                {
                    provide: IResourceRepository,
                    useClass: MockResourceRepository
                },
                {
                    provide: PaginateResourcesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateResourcesQueryHandler>(PaginateResourcesQueryHandler);
        service         = module.get<PaginateResourcesService>(PaginateResourcesService);
        repository      = <MockResourceRepository>module.get<IResourceRepository>(IResourceRepository);
        mapper          = new ResourceMapper();
    });

    describe('main', () =>
    {
        test('PaginateResourcesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an resources paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateResourcesQuery(
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