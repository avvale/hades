import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreateResourcesService } from './create-resources.service';
import { IResourceRepository } from './../../domain/resource.repository';
import { MockResourceRepository } from './../../infrastructure/mock/mock-resource.repository';

describe('CreateResourcesService', () => 
{
    let service: CreateResourcesService;
    let repository: IResourceRepository;
    let mockRepository: MockResourceRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateResourcesService,
                MockResourceRepository,
                { 
                    provide: IResourceRepository,
                    useValue: {
                        insert: (items) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateResourcesService);
        repository      = module.get(IResourceRepository);
        mockRepository  = module.get(MockResourceRepository);
    });

    describe('main', () => 
    {
        test('CreateResourcesService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create resources and emit event', async () => 
        {
            expect(await service.main(
                mockRepository.collectionSource
            )).toBe(undefined);
        });
    });
});