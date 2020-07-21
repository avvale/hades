import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteTagsCommandHandler } from './delete-tags.command-handler';
import { DeleteTagsCommand } from './delete-tags.command';
import { DeleteTagsService } from './delete-tags.service';

describe('DeleteTagsCommandHandler', () => 
{
    let commandHandler: DeleteTagsCommandHandler;
    let service: DeleteTagsService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteTagsCommandHandler,
                {
                    provide: DeleteTagsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteTagsCommandHandler>(DeleteTagsCommandHandler);
        service         = module.get<DeleteTagsService>(DeleteTagsService);
    });

    describe('main', () => 
    {
        test('DeleteTagsCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteTagsCommand()
            )).toBe(undefined);
        });
    });
});