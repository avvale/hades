import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { PaginateResourcesService } from './paginate-resources.service';
import { IResourceRepository } from './../../domain/resource.repository';
import { MockResourceRepository } from './../../infrastructure/mock/mock-resource.repository';

describe('PaginateResourcesService', () =>
{
    let service: PaginateResourcesService;
    let repository: IResourceRepository;
    let mockRepository: MockResourceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                PaginateResourcesService,
                MockResourceRepository,
                {
                    provide: IResourceRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(PaginateResourcesService);
        repository      = module.get(IResourceRepository);
        mockRepository  = module.get(MockResourceRepository);
    });

    describe('main', () =>
    {
        test('PaginateResourcesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate resources', async () =>
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            })));
            expect(await service.main({
                offset: 0,
                limit: 10
            })).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            });
        });
    });
});