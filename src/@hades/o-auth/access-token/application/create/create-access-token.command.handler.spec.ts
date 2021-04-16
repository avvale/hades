// ignored file
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateAccessTokenCommandHandler } from './create-access-token.command-handler';
import { accessTokensToCreate } from '@hades/o-auth/access-token/infrastructure/seeds/access-token-to-create.seed';
import { CreateAccessTokenCommand } from './create-access-token.command';
import { CreateAccessTokenService } from './create-access-token.service';

describe('CreateAccessTokenCommandHandler', () =>
{
    let commandHandler: CreateAccessTokenCommandHandler;
    let service: CreateAccessTokenService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAccessTokenCommandHandler,
                {
                    provide: CreateAccessTokenService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateAccessTokenCommandHandler>(CreateAccessTokenCommandHandler);
        service         = module.get<CreateAccessTokenService>(CreateAccessTokenService);
    });

    describe('main', () =>
    {
        test('CreateAccessTokenCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateAccessTokenService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateAccessTokenCommand(
                    {
                        id: accessTokensToCreate[0].id,
                        clientId: accessTokensToCreate[0].clientId,
                        accountId: accessTokensToCreate[0].accountId,
                        name: accessTokensToCreate[0].name,
                        expiredAccessToken: accessTokensToCreate[0].expiredAccessToken,
                    }
                )
            )).toBe(undefined);
        });
    });
});