import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateAttachmentLibraryCommandHandler } from './create-attachment-library.command-handler';
import { attachmentLibrary } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';
import { CreateAttachmentLibraryCommand } from './create-attachment-library.command';
import { CreateAttachmentLibraryService } from './create-attachment-library.service';

describe('CreateAttachmentLibraryCommandHandler', () =>
{
    let commandHandler: CreateAttachmentLibraryCommandHandler;
    let service: CreateAttachmentLibraryService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAttachmentLibraryCommandHandler,
                {
                    provide: CreateAttachmentLibraryService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateAttachmentLibraryCommandHandler>(CreateAttachmentLibraryCommandHandler);
        service         = module.get<CreateAttachmentLibraryService>(CreateAttachmentLibraryService);
    });

    describe('main', () =>
    {
        test('CreateAttachmentLibraryCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateAttachmentLibraryService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateAttachmentLibraryCommand(
                    attachmentLibrary[0].id,
                    attachmentLibrary[0].name,
                    attachmentLibrary[0].pathname,
                    attachmentLibrary[0].filename,
                    attachmentLibrary[0].url,
                    attachmentLibrary[0].mime,
                    attachmentLibrary[0].extension,
                    attachmentLibrary[0].size,
                    attachmentLibrary[0].width,
                    attachmentLibrary[0].height,
                    attachmentLibrary[0].data,
                )
            )).toBe(undefined);
        });
    });
});