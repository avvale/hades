import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateAttachmentLibraryCommandHandler } from './update-attachment-library.command-handler';
import { attachmentLibraries } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';
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
                    attachmentLibraries[0].id,
                    attachmentLibraries[0].name,
                    attachmentLibraries[0].pathname,
                    attachmentLibraries[0].filename,
                    attachmentLibraries[0].url,
                    attachmentLibraries[0].mime,
                    attachmentLibraries[0].extension,
                    attachmentLibraries[0].size,
                    attachmentLibraries[0].width,
                    attachmentLibraries[0].height,
                    attachmentLibraries[0].data,
                )
            )).toBe(undefined);
        });
    });
});