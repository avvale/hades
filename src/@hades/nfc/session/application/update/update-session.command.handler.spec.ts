import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateSessionCommandHandler } from './update-session.command-handler';
import { sessions } from '@hades/nfc/session/infrastructure/seeds/session.seed';
import { UpdateSessionCommand } from './update-session.command';
import { UpdateSessionService } from './update-session.service';

describe('UpdateSessionCommandHandler', () => 
{
    let commandHandler: UpdateSessionCommandHandler;
    let service: UpdateSessionService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateSessionCommandHandler,
                {
                    provide: UpdateSessionService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateSessionCommandHandler>(UpdateSessionCommandHandler);
        service         = module.get<UpdateSessionService>(UpdateSessionService);
    });

    describe('main', () => 
    {
        test('UpdateSessionCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an session created', async () => 
        {
            expect(await commandHandler.execute(
                new UpdateSessionCommand(
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