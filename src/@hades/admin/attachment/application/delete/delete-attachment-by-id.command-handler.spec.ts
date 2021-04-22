import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteAttachmentByIdCommandHandler } from './delete-attachment-by-id.command-handler';
import { attachments } from '@hades/admin/attachment/infrastructure/seeds/attachment.seed';
import { DeleteAttachmentByIdCommand } from './delete-attachment-by-id.command';
import { DeleteAttachmentByIdService } from './delete-attachment-by-id.service';

describe('DeleteAttachmentByIdCommandHandler', () =>
{
    let commandHandler: DeleteAttachmentByIdCommandHandler;
    let service: DeleteAttachmentByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteAttachmentByIdCommandHandler,
                {
                    provide: DeleteAttachmentByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteAttachmentByIdCommandHandler>(DeleteAttachmentByIdCommandHandler);
        service         = module.get<DeleteAttachmentByIdService>(DeleteAttachmentByIdService);
    });

    describe('main', () =>
    {
        test('DeleteAttachmentByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteAttachmentByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteAttachmentByIdCommand(
                    attachments[0].id,
                )
            )).toBe(undefined);
        });
    });
});