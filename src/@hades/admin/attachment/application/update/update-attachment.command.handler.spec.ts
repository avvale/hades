import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateAttachmentCommandHandler } from './update-attachment.command-handler';
import { attachments } from '@hades/admin/attachment/infrastructure/seeds/attachment.seed';
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
                    attachments[0].id,
                    attachments[0].commonId,
                    attachments[0].langId,
                    attachments[0].attachableModel,
                    attachments[0].attachableId,
                    attachments[0].familyId,
                    attachments[0].sort,
                    attachments[0].alt,
                    attachments[0].title,
                    attachments[0].description,
                    attachments[0].excerpt,
                    attachments[0].name,
                    attachments[0].pathname,
                    attachments[0].filename,
                    attachments[0].url,
                    attachments[0].mime,
                    attachments[0].extension,
                    attachments[0].size,
                    attachments[0].width,
                    attachments[0].height,
                    attachments[0].libraryId,
                    attachments[0].libraryFilename,
                    attachments[0].data,
                )
            )).toBe(undefined);
        });
    });
});