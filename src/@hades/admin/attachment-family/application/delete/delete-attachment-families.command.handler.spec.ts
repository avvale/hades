import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteAttachmentFamiliesCommandHandler } from './delete-attachment-families.command-handler';
import { DeleteAttachmentFamiliesCommand } from './delete-attachment-families.command';
import { DeleteAttachmentFamiliesService } from './delete-attachment-families.service';

describe('DeleteAttachmentFamiliesCommandHandler', () => 
{
    let commandHandler: DeleteAttachmentFamiliesCommandHandler;
    let service: DeleteAttachmentFamiliesService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteAttachmentFamiliesCommandHandler,
                {
                    provide: DeleteAttachmentFamiliesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteAttachmentFamiliesCommandHandler>(DeleteAttachmentFamiliesCommandHandler);
        service         = module.get<DeleteAttachmentFamiliesService>(DeleteAttachmentFamiliesService);
    });

    describe('main', () => 
    {
        test('DeleteAttachmentFamiliesCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteAttachmentFamiliesCommand()
            )).toBe(undefined);
        });
    });
});