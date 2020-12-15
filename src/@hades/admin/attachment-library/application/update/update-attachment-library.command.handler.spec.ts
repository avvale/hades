import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateAttachmentLibraryCommandHandler } from './update-attachment-library.command-handler';
import { attachmentLibrary } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';
import { UpdateAttachmentLibraryCommand } from './update-attachment-library.command';
import { UpdateAttachmentLibraryService } from './update-attachment-library.service';

describe('UpdateAttachmentLibraryCommandHandler', () =>
{
    let commandHandler: UpdateAttachmentLibraryCommandHandler;
    let service: UpdateAttachmentLibraryService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAttachmentLibraryCommandHandler,
                {
                    provide: UpdateAttachmentLibraryService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateAttachmentLibraryCommandHandler>(UpdateAttachmentLibraryCommandHandler);
        service         = module.get<UpdateAttachmentLibraryService>(UpdateAttachmentLibraryService);
    });

    describe('main', () =>
    {
        test('UpdateAttachmentLibraryCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an attachmentLibrary created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateAttachmentLibraryCommand(
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