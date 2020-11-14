import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';
import { CreateAttachmentFamilyService } from './create-attachment-family.service';
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