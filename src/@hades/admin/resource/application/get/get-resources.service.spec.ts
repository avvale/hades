import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetResourcesService } from './get-resources.service';
import { IResourceRepository } from './../../domain/resource.repository';
import { MockResourceRepository } from './../../infrastructure/mock/mock-resource.repository';

describe('GetResourcesService', () => 
{
    let service: GetResourcesService;
    let repository: IResourceRepository;
    let mockRepository: MockResourceRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetResourcesService,
                MockResourceRepository,
                { 
                    provide: IResourceRepository,
                    useValue: {
                        get: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(GetResourcesService);
        repository      = module.get(IResourceRepository);
        mockRepository  = module.get(MockResourceRepository);
    });

    describe('main', () => 
    {
        it('GetResourcesService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        it('should get resources', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main([])).toBe(mockRepository.collectionSource);
        });
    });
});