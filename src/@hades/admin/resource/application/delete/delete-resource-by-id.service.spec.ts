import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';
import { DeleteResourceByIdService } from './delete-resource-by-id.service';
import { ResourceId } from './../../domain/value-objects';
import { IResourceRepository } from './../../domain/resource.repository';
import { MockResourceRepository } from './../../infrastructure/mock/mock-resource.repository';

describe('DeleteResourceByIdService', () => 
{
    let service: DeleteResourceByIdService;
    let repository: IResourceRepository;
    let mockRepository: MockResourceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteResourceByIdService,
                MockResourceRepository,
                {
                    provide: IResourceRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteResourceByIdService);
        repository      = module.get(IResourceRepository);
        mockRepository  = module.get(MockResourceRepository);
    });

    describe('main', () => 
    {
        test('DeleteResourceByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete resource and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ResourceId(resources[0].id)
            )).toBe(undefined);
        });
    });
});