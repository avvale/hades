import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { attachmentFamilies } from '@hades/admin/attachment-family/infrastructure/seeds/attachment-family.seed';
import { CreateAttachmentFamiliesCommandHandler } from './create-attachment-families.command-handler';
import { CreateAttachmentFamiliesCommand } from './create-attachment-families.command';
import { CreateAttachmentFamiliesService } from './create-attachment-families.service';

describe('CreateAttachmentFamiliesCommandHandler', () =>
{
    let commandHandler: CreateAttachmentFamiliesCommandHandler;
    let service: CreateAttachmentFamiliesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAttachmentFamiliesCommandHandler,
                {
                    provide: CreateAttachmentFamiliesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateAttachmentFamiliesCommandHandler>(CreateAttachmentFamiliesCommandHandler);
        service         = module.get<CreateAttachmentFamiliesService>(CreateAttachmentFamiliesService);
    });

    describe('main', () =>
    {
        test('CreateAttachmentFamiliesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an attachmentFamily created', async () =>
        {
            expect(await commandHandler.execute(
                new CreateAttachmentFamiliesCommand(
                    attachmentFamilies

                )
            )).toBe(undefined);
        });
    });
});