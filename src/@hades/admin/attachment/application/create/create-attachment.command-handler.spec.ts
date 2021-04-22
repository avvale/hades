import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { attachments } from '@hades/admin/attachment/infrastructure/seeds/attachment.seed';
import { CreateAttachmentCommandHandler } from './create-attachment.command-handler';
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