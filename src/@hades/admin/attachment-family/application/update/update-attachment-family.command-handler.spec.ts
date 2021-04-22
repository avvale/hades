import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';
import { UpdateAttachmentFamilyCommandHandler } from './update-attachment-family.command-handler';
import { UpdateAttachmentFamilyCommand } from './update-attachment-family.command';
import { UpdateAttachmentFamilyService } from './update-attachment-family.service';

describe('UpdateAttachmentFamilyCommandHandler', () =>
{
    let commandHandler: UpdateAttachmentFamilyCommandHandler;
    let service: UpdateAttachmentFamilyService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAttachmentFamilyCommandHandler,
                {
                    provide: UpdateAttachmentFamilyService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateAttachmentFamilyCommandHandler>(UpdateAttachmentFamilyCommandHandler);
        service         = module.get<UpdateAttachmentFamilyService>(UpdateAttachmentFamilyService);
    });

    describe('main', () =>
    {
        test('UpdateAttachmentFamilyCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an attachmentFamily created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateAttachmentFamilyCommand(
                    {
                        id: attachmentFamilies[0].id,
                        name: attachmentFamilies[0].name,
                        resourceIds: attachmentFamilies[0].resourceIds,
                        width: attachmentFamilies[0].width,
                        height: attachmentFamilies[0].height,
                        fit: attachmentFamilies[0].fit,
                        sizes: attachmentFamilies[0].sizes,
                        quality: attachmentFamilies[0].quality,
                        format: attachmentFamilies[0].format,
                    }
                )
            )).toBe(undefined);
        });
    });
});