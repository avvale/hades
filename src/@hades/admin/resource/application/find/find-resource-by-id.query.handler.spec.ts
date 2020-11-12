import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindResourceByIdQueryHandler } from './find-resource-by-id.query-handler';
import { MockResourceRepository } from '@hades/admin/resource/infrastructure/mock/mock-resource.repository';
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';
import { IResourceRepository } from '@hades/admin/resource/domain/resource.repository';
import { ResourceMapper } from '@hades/admin/resource/domain/resource.mapper';
import { FindResourceByIdQuery } from './find-resource-by-id.query';
import { FindResourceByIdService } from './find-resource-by-id.service';

describe('FindResourceByIdQueryHandler', () => 
{
    let queryHandler: FindResourceByIdQueryHandler;
    let service: FindResourceByIdService;
    let repository: MockResourceRepository;
    let mapper: ResourceMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindResourceByIdQueryHandler,
                {
                    provide: IResourceRepository,
                    useClass: MockResourceRepository
                },
                {
                    provide: FindResourceByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindResourceByIdQueryHandler>(FindResourceByIdQueryHandler);
        service         = module.get<FindResourceByIdService>(FindResourceByIdService);
        repository      = <MockResourceRepository>module.get<IResourceRepository>(IResourceRepository);
        mapper          = new ResourceMapper();
    });

    describe('main', () =>
    {
        test('FindResourceByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an resource founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindResourceByIdQuery(
                    resources[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});