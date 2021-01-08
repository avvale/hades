import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { attachments } from '@hades/admin/attachment/infrastructure/seeds/attachment.seed';
import { CreateAttachmentService } from './create-attachment.service';
import {
    AttachmentId,
    AttachmentCommonId,
    AttachmentLangId,
    AttachmentAttachableModel,
    AttachmentAttachableId,
    AttachmentFamilyId,
    AttachmentSort,
    AttachmentAlt,
    AttachmentTitle,
    AttachmentDescription,
    AttachmentExcerpt,
    AttachmentName,
    AttachmentPathname,
    AttachmentFilename,
    AttachmentUrl,
    AttachmentMime,
    AttachmentExtension,
    AttachmentSize,
    AttachmentWidth,
    AttachmentHeight,
    AttachmentLibraryId,
    AttachmentLibraryFilename,
    AttachmentData,
    AttachmentCreatedAt,
    AttachmentUpdatedAt,
    AttachmentDeletedAt,
} from './../../domain/value-objects';
import { IAttachmentRepository } from './../../domain/attachment.repository';
import { MockAttachmentRepository } from './../../infrastructure/mock/mock-attachment.repository';

describe('CreateAttachmentService', () =>

{
    let service: CreateAttachmentService;
    let repository: IAttachmentRepository;
    let mockRepository: MockAttachmentRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateAttachmentService,
                MockAttachmentRepository,
                {
                    provide: IAttachmentRepository,
                    useValue: {
                        create: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateAttachmentService);
        repository      = module.get(IAttachmentRepository);
        mockRepository  = module.get(MockAttachmentRepository);
    });

    describe('main', () =>
    {
        test('CreateAttachmentService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a attachment and emit event', async () =>
        {
            expect(await service.main(
                new AttachmentId(attachments[0].id),
                new AttachmentCommonId(attachments[0].commonId),
                new AttachmentLangId(attachments[0].langId),
                new AttachmentAttachableModel(attachments[0].attachableModel),
                new AttachmentAttachableId(attachments[0].attachableId),
                new AttachmentFamilyId(attachments[0].familyId),
                new AttachmentSort(attachments[0].sort),
                new AttachmentAlt(attachments[0].alt),
                new AttachmentTitle(attachments[0].title),
                new AttachmentDescription(attachments[0].description),
                new AttachmentExcerpt(attachments[0].excerpt),
                new AttachmentName(attachments[0].name),
                new AttachmentPathname(attachments[0].pathname),
                new AttachmentFilename(attachments[0].filename),
                new AttachmentUrl(attachments[0].url),
                new AttachmentMime(attachments[0].mime),
                new AttachmentExtension(attachments[0].extension),
                new AttachmentSize(attachments[0].size),
                new AttachmentWidth(attachments[0].width),
                new AttachmentHeight(attachments[0].height),
                new AttachmentLibraryId(attachments[0].libraryId),
                new AttachmentLibraryFilename(attachments[0].libraryFilename),
                new AttachmentData(attachments[0].data),
            )).toBe(undefined);
        });
    });
});