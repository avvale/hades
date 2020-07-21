import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateTagCommandHandler } from './update-tag.command-handler';
import { tags } from '@hades/nfc/tag/infrastructure/seeds/tag.seed';
import { UpdateTagCommand } from './update-tag.command';
import { UpdateTagService } from './update-tag.service';

describe('UpdateTagCommandHandler', () => 
{
    let commandHandler: UpdateTagCommandHandler;
    let service: UpdateTagService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateTagCommandHandler,
                {
                    provide: UpdateTagService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateTagCommandHandler>(UpdateTagCommandHandler);
        service         = module.get<UpdateTagService>(UpdateTagService);
    });

    describe('main', () => 
    {
        test('UpdateTagCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an tag created', async () => 
        {
            expect(await commandHandler.execute(
                new UpdateTagCommand(
                    tags[0].id,
                    tags[0].code,
                    tags[0].tenantId,
                    tags[0].tenantCode,
                    tags[0].urlBase,
                    tags[0].params,
                    tags[0].offset,
                    tags[0].isSessionRequired,
                    
                )
            )).toBe(undefined);
        });
    });
});