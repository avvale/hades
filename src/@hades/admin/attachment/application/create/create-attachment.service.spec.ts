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
                {
                    id: new AttachmentId(attachments[0].id),
                    commonId: new AttachmentCommonId(attachments[0].commonId),
                    langId: new AttachmentLangId(attachments[0].langId),
                    attachableModel: new AttachmentAttachableModel(attachments[0].attachableModel),
                    attachableId: new AttachmentAttachableId(attachments[0].attachableId),
                    familyId: new AttachmentFamilyId(attachments[0].familyId),
                    sort: new AttachmentSort(attachments[0].sort),
                    alt: new AttachmentAlt(attachments[0].alt),
                    title: new AttachmentTitle(attachments[0].title),
                    description: new AttachmentDescription(attachments[0].description),
                    excerpt: new AttachmentExcerpt(attachments[0].excerpt),
                    name: new AttachmentName(attachments[0].name),
                    pathname: new AttachmentPathname(attachments[0].pathname),
                    filename: new AttachmentFilename(attachments[0].filename),
                    url: new AttachmentUrl(attachments[0].url),
                    mime: new AttachmentMime(attachments[0].mime),
                    extension: new AttachmentExtension(attachments[0].extension),
                    size: new AttachmentSize(attachments[0].size),
                    width: new AttachmentWidth(attachments[0].width),
                    height: new AttachmentHeight(attachments[0].height),
                    libraryId: new AttachmentLibraryId(attachments[0].libraryId),
                    libraryFilename: new AttachmentLibraryFilename(attachments[0].libraryFilename),
                    data: new AttachmentData(attachments[0].data),
                }
            )).toBe(undefined);
        });
    });
});