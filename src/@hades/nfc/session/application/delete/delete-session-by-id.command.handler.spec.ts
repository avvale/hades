import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteSessionByIdCommandHandler } from './delete-session-by-id.command-handler';
import { sessions } from '@hades/nfc/session/infrastructure/seeds/session.seed';
import { DeleteSessionByIdCommand } from './delete-session-by-id.command';
import { DeleteSessionByIdService } from './delete-session-by-id.service';

describe('DeleteSessionByIdCommandHandler', () => 
{
    let commandHandler: DeleteSessionByIdCommandHandler;
    let service: DeleteSessionByIdService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteSessionByIdCommandHandler,
                {
                    provide: DeleteSessionByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteSessionByIdCommandHandler>(DeleteSessionByIdCommandHandler);
        service         = module.get<DeleteSessionByIdService>(DeleteSessionByIdService);
    });

    describe('main', () => 
    {
        test('DeleteSessionByIdCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteSessionByIdService', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteSessionByIdCommand(
                    sessions[0].id,
                
                )
            )).toBe(undefined);
        });
    });
});