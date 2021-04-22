import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { attachments } from '@hades/admin/attachment/infrastructure/seeds/attachment.seed';
import { UpdateAttachmentCommandHandler } from './update-attachment.command-handler';
import { UpdateAttachmentCommand } from './update-attachment.command';
import { UpdateAttachmentService } from './update-attachment.service';

describe('UpdateAttachmentCommandHandler', () =>
{
    let commandHandler: UpdateAttachmentCommandHandler;
    let service: UpdateAttachmentService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAttachmentCommandHandler,
                {
                    provide: UpdateAttachmentService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateAttachmentCommandHandler>(UpdateAttachmentCommandHandler);
        service         = module.get<UpdateAttachmentService>(UpdateAttachmentService);
    });

    describe('main', () =>
    {
        test('UpdateAttachmentCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an attachment created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateAttachmentCommand(
                    {
                        id: attachments[0].id,
                        commonId: attachments[0].commonId,
                        langId: attachments[0].langId,
                        attachableModel: attachments[0].attachableModel,
                        attachableId: attachments[0].attachableId,
                        familyId: attachments[0].familyId,
                        sort: attachments[0].sort,
                        alt: attachments[0].alt,
                        title: attachments[0].title,
                        description: attachments[0].description,
                        excerpt: attachments[0].excerpt,
                        name: attachments[0].name,
                        pathname: attachments[0].pathname,
                        filename: attachments[0].filename,
                        url: attachments[0].url,
                        mime: attachments[0].mime,
                        extension: attachments[0].extension,
                        size: attachments[0].size,
                        width: attachments[0].width,
                        height: attachments[0].height,
                        libraryId: attachments[0].libraryId,
                        libraryFilename: attachments[0].libraryFilename,
                        data: attachments[0].data,
                    }
                )
            )).toBe(undefined);
        });
    });
});