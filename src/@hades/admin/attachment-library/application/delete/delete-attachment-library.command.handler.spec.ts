import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteAttachmentLibraryCommandHandler } from './delete-attachment-library.command-handler';
import { DeleteAttachmentLibraryCommand } from './delete-attachment-library.command';
import { DeleteAttachmentLibraryService } from './delete-attachment-library.service';

describe('DeleteAttachmentLibraryCommandHandler', () => 
{
    let commandHandler: DeleteAttachmentLibraryCommandHandler;
    let service: DeleteAttachmentLibraryService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteAttachmentLibraryCommandHandler,
                {
                    provide: DeleteAttachmentLibraryService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteAttachmentLibraryCommandHandler>(DeleteAttachmentLibraryCommandHandler);
        service         = module.get<DeleteAttachmentLibraryService>(DeleteAttachmentLibraryService);
    });

    describe('main', () => 
    {
        test('DeleteAttachmentLibraryCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteAttachmentLibraryCommand()
            )).toBe(undefined);
        });
    });
});