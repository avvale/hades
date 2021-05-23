import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteAttachmentFamilyByIdCommandHandler } from './delete-attachment-family-by-id.command-handler';
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';
import { DeleteAttachmentFamilyByIdCommand } from './delete-attachment-family-by-id.command';
import { DeleteAttachmentFamilyByIdService } from './delete-attachment-family-by-id.service';

describe('DeleteAttachmentFamilyByIdCommandHandler', () =>
{
    let commandHandler: DeleteAttachmentFamilyByIdCommandHandler;
    let service: DeleteAttachmentFamilyByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteAttachmentFamilyByIdCommandHandler,
                {
                    provide: DeleteAttachmentFamilyByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteAttachmentFamilyByIdCommandHandler>(DeleteAttachmentFamilyByIdCommandHandler);
        service         = module.get<DeleteAttachmentFamilyByIdService>(DeleteAttachmentFamilyByIdService);
    });

    describe('main', () =>
    {
        test('DeleteAttachmentFamilyByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteAttachmentFamilyByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteAttachmentFamilyByIdCommand(
                    attachmentFamilies[0].id,
                )
            )).toBe(undefined);
        });
    });
});