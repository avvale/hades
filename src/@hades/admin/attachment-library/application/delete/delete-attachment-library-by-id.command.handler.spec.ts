import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteAttachmentLibraryByIdCommandHandler } from './delete-attachment-library-by-id.command-handler';
import { attachmentLibrary } from '@hades/admin/attachment-library/infrastructure/seeds/attachment-library.seed';
import { DeleteAttachmentLibraryByIdCommand } from './delete-attachment-library-by-id.command';
import { DeleteAttachmentLibraryByIdService } from './delete-attachment-library-by-id.service';

describe('DeleteAttachmentLibraryByIdCommandHandler', () => 
{
    let commandHandler: DeleteAttachmentLibraryByIdCommandHandler;
    let service: DeleteAttachmentLibraryByIdService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteAttachmentLibraryByIdCommandHandler,
                {
                    provide: DeleteAttachmentLibraryByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteAttachmentLibraryByIdCommandHandler>(DeleteAttachmentLibraryByIdCommandHandler);
        service         = module.get<DeleteAttachmentLibraryByIdService>(DeleteAttachmentLibraryByIdService);
    });

    describe('main', () => 
    {
        test('DeleteAttachmentLibraryByIdCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteAttachmentLibraryByIdService', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteAttachmentLibraryByIdCommand(
                    attachmentLibrary[0].id,
                )
            )).toBe(undefined);
        });
    });
});