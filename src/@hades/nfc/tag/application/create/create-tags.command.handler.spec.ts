import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateTagsCommandHandler } from './create-tags.command-handler';
import { tags } from '@hades/nfc/tag/infrastructure/seeds/tag.seed';
import { CreateTagsCommand } from './create-tags.command';
import { CreateTagsService } from './create-tags.service';

describe('CreateTagsCommandHandler', () => 
{
    let commandHandler: CreateTagsCommandHandler;
    let service: CreateTagsService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateTagsCommandHandler,
                {
                    provide: CreateTagsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateTagsCommandHandler>(CreateTagsCommandHandler);
        service         = module.get<CreateTagsService>(CreateTagsService);
    });

    describe('main', () => 
    {
        test('CreateTagsCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an tag created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateTagsCommand(
                    tags
                
                )
            )).toBe(undefined);
        });
    });
});