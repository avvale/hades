import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateAttachmentFamilyCommandHandler } from './create-attachment-family.command-handler';
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';
import { CreateAttachmentFamilyCommand } from './create-attachment-family.command';
import { CreateAttachmentFamilyService } from './create-attachment-family.service';

describe('CreateAttachmentFamilyCommandHandler', () =>
{
    let commandHandler: CreateAttachmentFamilyCommandHandler;
    let service: CreateAttachmentFamilyService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAttachmentFamilyCommandHandler,
                {
                    provide: CreateAttachmentFamilyService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateAttachmentFamilyCommandHandler>(CreateAttachmentFamilyCommandHandler);
        service         = module.get<CreateAttachmentFamilyService>(CreateAttachmentFamilyService);
    });

    describe('main', () =>
    {
        test('CreateAttachmentFamilyCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateAttachmentFamilyService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateAttachmentFamilyCommand(
                    attachmentFamilies[0].id,
                    attachmentFamilies[0].name,
                    attachmentFamilies[0].width,
                    attachmentFamilies[0].height,
                    attachmentFamilies[0].fit,
                    attachmentFamilies[0].sizes,
                    attachmentFamilies[0].quality,
                    attachmentFamilies[0].format,
                )
            )).toBe(undefined);
        });
    });
});