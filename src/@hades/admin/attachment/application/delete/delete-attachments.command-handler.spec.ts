import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteAttachmentsCommandHandler } from './delete-attachments.command-handler';
import { DeleteAttachmentsCommand } from './delete-attachments.command';
import { DeleteAttachmentsService } from './delete-attachments.service';

describe('DeleteAttachmentsCommandHandler', () =>
{
    let commandHandler: DeleteAttachmentsCommandHandler;
    let service: DeleteAttachmentsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteAttachmentsCommandHandler,
                {
                    provide: DeleteAttachmentsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteAttachmentsCommandHandler>(DeleteAttachmentsCommandHandler);
        service         = module.get<DeleteAttachmentsService>(DeleteAttachmentsService);
    });

    describe('main', () =>
    {
        test('DeleteAttachmentsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteAttachmentsCommand()
            )).toBe(undefined);
        });
    });
});