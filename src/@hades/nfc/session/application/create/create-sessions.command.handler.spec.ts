import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateSessionsCommandHandler } from './create-sessions.command-handler';
import { sessions } from '@hades/nfc/session/infrastructure/seeds/session.seed';
import { CreateSessionsCommand } from './create-sessions.command';
import { CreateSessionsService } from './create-sessions.service';

describe('CreateSessionsCommandHandler', () => 
{
    let commandHandler: CreateSessionsCommandHandler;
    let service: CreateSessionsService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateSessionsCommandHandler,
                {
                    provide: CreateSessionsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateSessionsCommandHandler>(CreateSessionsCommandHandler);
        service         = module.get<CreateSessionsService>(CreateSessionsService);
    });

    describe('main', () => 
    {
        test('CreateSessionsCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an session created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateSessionsCommand(
                    sessions
                
                )
            )).toBe(undefined);
        });
    });
});