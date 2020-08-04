import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';
import { UpdateResourceService } from './update-resource.service';
import { 
    ResourceId, 
    ResourceBoundedContextId, 
    ResourceName, 
    ResourceHasCustomFields, 
    ResourceHasAttachments, 
    ResourceCreatedAt, 
    ResourceUpdatedAt, 
    ResourceDeletedAt
    
} from './../../domain/value-objects';
import { IResourceRepository } from './../../domain/resource.repository';
import { MockResourceRepository } from './../../infrastructure/mock/mock-resource.repository';

describe('UpdateResourceService', () => 
{
    let service: UpdateResourceService;
    let repository: IResourceRepository;
    let mockRepository: MockResourceRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateResourceService,
                MockResourceRepository,
                { 
                    provide: IResourceRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateResourceService);
        repository      = module.get(IResourceRepository);
        mockRepository  = module.get(MockResourceRepository);
    });

    describe('main', () => 
    {
        test('UpdateResourceService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should update a resource and emit event', async () => 
        {
            expect(await service.main(
                new ResourceId(resources[0].id),
                new ResourceBoundedContextId(resources[0].boundedContextId),
                new ResourceName(resources[0].name),
                new ResourceHasCustomFields(resources[0].hasCustomFields),
                new ResourceHasAttachments(resources[0].hasAttachments),
                
            )).toBe(undefined);
        });
    });
});