import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteSessionsCommandHandler } from './delete-sessions.command-handler';
import { DeleteSessionsCommand } from './delete-sessions.command';
import { DeleteSessionsService } from './delete-sessions.service';

describe('DeleteSessionsCommandHandler', () => 
{
    let commandHandler: DeleteSessionsCommandHandler;
    let service: DeleteSessionsService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteSessionsCommandHandler,
                {
                    provide: DeleteSessionsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteSessionsCommandHandler>(DeleteSessionsCommandHandler);
        service         = module.get<DeleteSessionsService>(DeleteSessionsService);
    });

    describe('main', () => 
    {
        test('DeleteSessionsCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteSessionsCommand()
            )).toBe(undefined);
        });
    });
});