import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateAttachmentLibraryCommandHandler } from './create-attachment-library.command-handler';
import { attachmentLibraries } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';
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
                    {
                        id : attachmentLibraries[0].id,
                        name : attachmentLibraries[0].name,
                        pathname : attachmentLibraries[0].pathname,
                        filename : attachmentLibraries[0].filename,
                        url : attachmentLibraries[0].url,
                        mime : attachmentLibraries[0].mime,
                        extension : attachmentLibraries[0].extension,
                        size : attachmentLibraries[0].size,
                        width : attachmentLibraries[0].width,
                        height : attachmentLibraries[0].height,
                        data : attachmentLibraries[0].data,
                    }
                )
            )).toBe(undefined);
        });
    });
});