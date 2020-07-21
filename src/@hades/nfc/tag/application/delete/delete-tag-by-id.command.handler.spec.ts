import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteTagByIdCommandHandler } from './delete-tag-by-id.command-handler';
import { tags } from '@hades/nfc/tag/infrastructure/seeds/tag.seed';
import { DeleteTagByIdCommand } from './delete-tag-by-id.command';
import { DeleteTagByIdService } from './delete-tag-by-id.service';

describe('DeleteTagByIdCommandHandler', () => 
{
    let commandHandler: DeleteTagByIdCommandHandler;
    let service: DeleteTagByIdService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteTagByIdCommandHandler,
                {
                    provide: DeleteTagByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteTagByIdCommandHandler>(DeleteTagByIdCommandHandler);
        service         = module.get<DeleteTagByIdService>(DeleteTagByIdService);
    });

    describe('main', () => 
    {
        test('DeleteTagByIdCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteTagByIdService', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteTagByIdCommand(
                    tags[0].id,
                
                )
            )).toBe(undefined);
        });
    });
});