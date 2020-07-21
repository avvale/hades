import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateSessionCommandHandler } from './create-session.command-handler';
import { sessions } from '@hades/nfc/session/infrastructure/seeds/session.seed';
import { CreateSessionCommand } from './create-session.command';
import { CreateSessionService } from './create-session.service';

describe('CreateSessionCommandHandler', () => 
{
    let commandHandler: CreateSessionCommandHandler;
    let service: CreateSessionService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateSessionCommandHandler,
                {
                    provide: CreateSessionService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateSessionCommandHandler>(CreateSessionCommandHandler);
        service         = module.get<CreateSessionService>(CreateSessionService);
    });

    describe('main', () => 
    {
        test('CreateSessionCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateSessionService', async () => 
        {
            expect(await commandHandler.execute(
                new CreateSessionCommand(
                    sessions[0].id,
                    sessions[0].ip,
                    sessions[0].tagId,
                    sessions[0].uid,
                    sessions[0].counter,
                    sessions[0].expiredAt,
                    
                )
            )).toBe(undefined);
        });
    });
});