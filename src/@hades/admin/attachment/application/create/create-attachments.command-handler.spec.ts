import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { attachments } from '@hades/admin/attachment/infrastructure/seeds/attachment.seed';
import { CreateAttachmentsCommandHandler } from './create-attachments.command-handler';
import { CreateAttachmentsCommand } from './create-attachments.command';
import { CreateAttachmentsService } from './create-attachments.service';

describe('CreateAttachmentsCommandHandler', () =>
{
    let commandHandler: CreateAttachmentsCommandHandler;
    let service: CreateAttachmentsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAttachmentsCommandHandler,
                {
                    provide: CreateAttachmentsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateAttachmentsCommandHandler>(CreateAttachmentsCommandHandler);
        service         = module.get<CreateAttachmentsService>(CreateAttachmentsService);
    });

    describe('main', () =>
    {
        test('CreateAttachmentsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an attachment created', async () =>
        {
            expect(await commandHandler.execute(
                new CreateAttachmentsCommand(
                    attachments

                )
            )).toBe(undefined);
        });
    });
});