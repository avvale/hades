import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateClientCommandHandler } from './create-client.command-handler';
import { clients } from '@hades/o-auth/client/infrastructure/seeds/client.seed';
import { CreateClientCommand } from './create-client.command';
import { CreateClientService } from './create-client.service';

describe('CreateClientCommandHandler', () => 
{
    let commandHandler: CreateClientCommandHandler;
    let service: CreateClientService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateClientCommandHandler,
                {
                    provide: CreateClientService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateClientCommandHandler>(CreateClientCommandHandler);
        service         = module.get<CreateClientService>(CreateClientService);
    });

    describe('main', () => 
    {
        test('CreateClientCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateClientService', async () => 
        {
            expect(await commandHandler.execute(
                new CreateClientCommand(
                    clients[0].id,
                    clients[0].grantType,
                    clients[0].name,
                    clients[0].secret,
                    clients[0].authUrl,
                    clients[0].redirect,
                    clients[0].expiredAccessToken,
                    clients[0].expiredRefreshToken,
                    clients[0].isRevoked,
                    clients[0].isMaster,
                    clients[0].applicationIds,
                    
                )
            )).toBe(undefined);
        });
    });
});