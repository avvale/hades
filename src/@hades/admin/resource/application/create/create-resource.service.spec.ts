import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { resources } from '@hades/admin/resource/infrastructure/seeds/resource.seed';
import { CreateResourceService } from './create-resource.service';
import {
    ResourceId,
    ResourceBoundedContextId,
    ResourceAttachmentFamilyIds,
    ResourceName,
    ResourceHasCustomFields,
    ResourceHasAttachments,
    ResourceCreatedAt,
    ResourceUpdatedAt,
    ResourceDeletedAt,
} from './../../domain/value-objects';
import { IResourceRepository } from './../../domain/resource.repository';
import { MockResourceRepository } from './../../infrastructure/mock/mock-resource.repository';

describe('CreateResourceService', () =>

{
    let service: CreateResourceService;
    let repository: IResourceRepository;
    let mockRepository: MockResourceRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateResourceService,
                MockResourceRepository,
                {
                    provide: IResourceRepository,
                    useValue: {
                        create: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateResourceService);
        repository      = module.get(IResourceRepository);
        mockRepository  = module.get(MockResourceRepository);
    });

    describe('main', () =>
    {
        test('CreateResourceService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a resource and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new ResourceId(resources[0].id),
                    boundedContextId: new ResourceBoundedContextId(resources[0].boundedContextId),
                    attachmentFamilyIds: new ResourceAttachmentFamilyIds(resources[0].attachmentFamilyIds),
                    name: new ResourceName(resources[0].name),
                    hasCustomFields: new ResourceHasCustomFields(resources[0].hasCustomFields),
                    hasAttachments: new ResourceHasAttachments(resources[0].hasAttachments),
                }
            )).toBe(undefined);
        });
    });
});