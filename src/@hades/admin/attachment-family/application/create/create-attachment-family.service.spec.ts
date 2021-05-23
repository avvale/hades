import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';
import { CreateAttachmentFamilyService } from './create-attachment-family.service';
import {
    AttachmentFamilyId,
    AttachmentFamilyName,
    AttachmentFamilyResourceIds,
    AttachmentFamilyWidth,
    AttachmentFamilyHeight,
    AttachmentFamilyFit,
    AttachmentFamilySizes,
    AttachmentFamilyQuality,
    AttachmentFamilyFormat,
    AttachmentFamilyCreatedAt,
    AttachmentFamilyUpdatedAt,
    AttachmentFamilyDeletedAt,
} from './../../domain/value-objects';
import { IAttachmentFamilyRepository } from './../../domain/attachment-family.repository';
import { MockAttachmentFamilyRepository } from './../../infrastructure/mock/mock-attachment-family.repository';

describe('CreateAttachmentFamilyService', () =>

{
    let service: CreateAttachmentFamilyService;
    let repository: IAttachmentFamilyRepository;
    let mockRepository: MockAttachmentFamilyRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateAttachmentFamilyService,
                MockAttachmentFamilyRepository,
                {
                    provide: IAttachmentFamilyRepository,
                    useValue: {
                        create: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateAttachmentFamilyService);
        repository      = module.get(IAttachmentFamilyRepository);
        mockRepository  = module.get(MockAttachmentFamilyRepository);
    });

    describe('main', () =>
    {
        test('CreateAttachmentFamilyService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a attachmentFamily and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new AttachmentFamilyId(attachmentFamilies[0].id),
                    name: new AttachmentFamilyName(attachmentFamilies[0].name),
                    resourceIds: new AttachmentFamilyResourceIds(attachmentFamilies[0].resourceIds),
                    width: new AttachmentFamilyWidth(attachmentFamilies[0].width),
                    height: new AttachmentFamilyHeight(attachmentFamilies[0].height),
                    fit: new AttachmentFamilyFit(attachmentFamilies[0].fit),
                    sizes: new AttachmentFamilySizes(attachmentFamilies[0].sizes),
                    quality: new AttachmentFamilyQuality(attachmentFamilies[0].quality),
                    format: new AttachmentFamilyFormat(attachmentFamilies[0].format),
                }
            )).toBe(undefined);
        });
    });
});