import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateAttachmentCommandHandler } from './create-attachment.command-handler';
import { attachments } from '@hades/admin/attachment/infrastructure/seeds/attachment.seed';
import { CreateAttachmentCommand } from './create-attachment.command';
import { CreateAttachmentService } from './create-attachment.service';

describe('CreateAttachmentCommandHandler', () =>
{
    let commandHandler: CreateAttachmentCommandHandler;
    let service: CreateAttachmentService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAttachmentCommandHandler,
                {
                    provide: CreateAttachmentService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateAttachmentCommandHandler>(CreateAttachmentCommandHandler);
        service         = module.get<CreateAttachmentService>(CreateAttachmentService);
    });

    describe('main', () =>
    {
        test('CreateAttachmentCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateAttachmentService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateAttachmentCommand(
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