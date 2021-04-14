import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateAttachmentLibrariesCommandHandler } from './create-attachment-libraries.command-handler';
import { attachmentLibraries } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';
import { CreateAttachmentLibrariesCommand } from './create-attachment-libraries.command';
import { CreateAttachmentLibrariesService } from './create-attachment-libraries.service';

describe('CreateAttachmentLibrariesCommandHandler', () =>
{
    let commandHandler: CreateAttachmentLibrariesCommandHandler;
    let service: CreateAttachmentLibrariesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAttachmentLibrariesCommandHandler,
                {
                    provide: CreateAttachmentLibrariesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateAttachmentLibrariesCommandHandler>(CreateAttachmentLibrariesCommandHandler);
        service         = module.get<CreateAttachmentLibrariesService>(CreateAttachmentLibrariesService);
    });

    describe('main', () =>
    {
        test('CreateAttachmentLibrariesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an attachmentLibrary created', async () =>
        {
            expect(await commandHandler.execute(
                new CreateAttachmentLibrariesCommand(
                    attachmentLibraries

                )
            )).toBe(undefined);
        });
    });
});