import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';
import { FindAttachmentFamilyByIdService } from './find-attachment-family-by-id.service';
import { AttachmentFamilyId } from './../../domain/value-objects';
import { IAttachmentFamilyRepository } from './../../domain/attachment-family.repository';
import { MockAttachmentFamilyRepository } from './../../infrastructure/mock/mock-attachment-family.repository';

describe('FindAttachmentFamilyByIdService', () =>
{
    let service: FindAttachmentFamilyByIdService;
    let repository: IAttachmentFamilyRepository;
    let mockRepository: MockAttachmentFamilyRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindAttachmentFamilyByIdService,
                MockAttachmentFamilyRepository,
                {
                    provide: IAttachmentFamilyRepository,
                    useValue: {
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindAttachmentFamilyByIdService);
        repository      = module.get(IAttachmentFamilyRepository);
        mockRepository  = module.get(MockAttachmentFamilyRepository);
    });

    describe('main', () =>
    {
        test('FindAttachmentFamilyByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find attachmentFamily by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AttachmentFamilyId(attachmentFamilies[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});