import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';
import { UpdateAttachmentFamilyService } from './update-attachment-family.service';
import {
    AttachmentFamilyId,
    AttachmentFamilyName,
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

describe('UpdateAttachmentFamilyService', () =>
{
    let service: UpdateAttachmentFamilyService;
    let repository: IAttachmentFamilyRepository;
    let mockRepository: MockAttachmentFamilyRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateAttachmentFamilyService,
                MockAttachmentFamilyRepository,
                {
                    provide: IAttachmentFamilyRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateAttachmentFamilyService);
        repository      = module.get(IAttachmentFamilyRepository);
        mockRepository  = module.get(MockAttachmentFamilyRepository);
    });

    describe('main', () =>
    {
        test('UpdateAttachmentFamilyService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a attachmentFamily and emit event', async () =>
        {
            expect(await service.main(
                new AttachmentFamilyId(attachmentFamilies[0].id),
                new AttachmentFamilyName(attachmentFamilies[0].name),
                new AttachmentFamilyWidth(attachmentFamilies[0].width),
                new AttachmentFamilyHeight(attachmentFamilies[0].height),
                new AttachmentFamilyFit(attachmentFamilies[0].fit),
                new AttachmentFamilySizes(attachmentFamilies[0].sizes),
                new AttachmentFamilyQuality(attachmentFamilies[0].quality),
                new AttachmentFamilyFormat(attachmentFamilies[0].format),
            )).toBe(undefined);
        });
    });
});