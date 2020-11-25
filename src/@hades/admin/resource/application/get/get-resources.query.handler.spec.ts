import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetResourcesQueryHandler } from './get-resources.query-handler';
import { MockResourceRepository } from '@hades/admin/resource/infrastructure/mock/mock-resource.repository';
import { IResourceRepository } from '@hades/admin/resource/domain/resource.repository';
import { ResourceMapper } from '@hades/admin/resource/domain/resource.mapper';
import { GetResourcesQuery } from './get-resources.query';
import { GetResourcesService } from './get-resources.service';

describe('GetResourcesQueryHandler', () => 
{
    let queryHandler: GetResourcesQueryHandler;
    let service: GetResourcesService;
    let repository: MockResourceRepository;
    let mapper: ResourceMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetResourcesQueryHandler,
                {
                    provide: IResourceRepository,
                    useClass: MockResourceRepository
                },
                {
                    provide: GetResourcesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetResourcesQueryHandler>(GetResourcesQueryHandler);
        service         = module.get<GetResourcesService>(GetResourcesService);
        repository      = <MockResourceRepository>module.get<IResourceRepository>(IResourceRepository);
        mapper          = new ResourceMapper();
    });

    describe('main', () => 
    {
        test('GetResourcesQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an resources founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetResourcesQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});