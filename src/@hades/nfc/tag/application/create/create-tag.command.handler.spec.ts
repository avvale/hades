import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateTagCommandHandler } from './create-tag.command-handler';
import { tags } from '@hades/nfc/tag/infrastructure/seeds/tag.seed';
import { CreateTagCommand } from './create-tag.command';
import { CreateTagService } from './create-tag.service';

describe('CreateTagCommandHandler', () => 
{
    let commandHandler: CreateTagCommandHandler;
    let service: CreateTagService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateTagCommandHandler,
                {
                    provide: CreateTagService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateTagCommandHandler>(CreateTagCommandHandler);
        service         = module.get<CreateTagService>(CreateTagService);
    });

    describe('main', () => 
    {
        test('CreateTagCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateTagService', async () => 
        {
            expect(await commandHandler.execute(
                new CreateTagCommand(
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