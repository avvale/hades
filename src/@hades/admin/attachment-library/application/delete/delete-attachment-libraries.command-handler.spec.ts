import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteAttachmentLibrariesCommandHandler } from './delete-attachment-libraries.command-handler';
import { DeleteAttachmentLibrariesCommand } from './delete-attachment-libraries.command';
import { DeleteAttachmentLibrariesService } from './delete-attachment-libraries.service';

describe('DeleteAttachmentLibrariesCommandHandler', () =>
{
    let commandHandler: DeleteAttachmentLibrariesCommandHandler;
    let service: DeleteAttachmentLibrariesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteAttachmentLibrariesCommandHandler,
                {
                    provide: DeleteAttachmentLibrariesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteAttachmentLibrariesCommandHandler>(DeleteAttachmentLibrariesCommandHandler);
        service         = module.get<DeleteAttachmentLibrariesService>(DeleteAttachmentLibrariesService);
    });

    describe('main', () =>
    {
        test('DeleteAttachmentLibrariesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteAttachmentLibrariesCommand()
            )).toBe(undefined);
        });
    });
});