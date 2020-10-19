import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateClientCommandHandler } from './update-client.command-handler';
import { clients } from '@hades/o-auth/client/infrastructure/seeds/client.seed';
import { UpdateClientCommand } from './update-client.command';
import { UpdateClientService } from './update-client.service';

describe('UpdateClientCommandHandler', () => 
{
    let commandHandler: UpdateClientCommandHandler;
    let service: UpdateClientService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateClientCommandHandler,
                {
                    provide: UpdateClientService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateClientCommandHandler>(UpdateClientCommandHandler);
        service         = module.get<UpdateClientService>(UpdateClientService);
    });

    describe('main', () => 
    {
        test('UpdateClientCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an client created', async () => 
        {
            expect(await commandHandler.execute(
                new UpdateClientCommand(
                    clients[0].id,
                    clients[0].grantType,
                    clients[0].name,
                    clients[0].secret,
                    clients[0].authUrl,
                    clients[0].redirect,
                    clients[0].expiredAccessToken,
                    clients[0].expiredRefreshToken,
                    clients[0].isActive,
                    clients[0].isMaster,
                    clients[0].applicationIds,
                    
                )
            )).toBe(undefined);
        });
    });
});