import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindResourceQueryHandler } from './find-resource.query-handler';
import { MockResourceRepository } from '@hades/admin/resource/infrastructure/mock/mock-resource.repository';
import { IResourceRepository } from '@hades/admin/resource/domain/resource.repository';
import { ResourceMapper } from '@hades/admin/resource/domain/resource.mapper';
import { FindResourceQuery } from './find-resource.query';
import { FindResourceService } from './find-resource.service';

describe('FindResourceQueryHandler', () => 
{
    let queryHandler: FindResourceQueryHandler;
    let service: FindResourceService;
    let repository: MockResourceRepository;
    let mapper: ResourceMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindResourceQueryHandler,
                {
                    provide: IResourceRepository,
                    useClass: MockResourceRepository
                },
                {
                    provide: FindResourceService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindResourceQueryHandler>(FindResourceQueryHandler);
        service         = module.get<FindResourceService>(FindResourceService);
        repository      = <MockResourceRepository>module.get<IResourceRepository>(IResourceRepository);
        mapper          = new ResourceMapper();
    });

    describe('main', () => 
    {
        test('FindResourceQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an resource founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindResourceQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});