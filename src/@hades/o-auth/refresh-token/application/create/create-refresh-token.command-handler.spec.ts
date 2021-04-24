// ignored file
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateRefreshTokenCommandHandler } from './create-refresh-token.command-handler';
import { refreshTokensToCreate } from '@hades/o-auth/refresh-token/infrastructure/seeds/refresh-tokens-to-create.seed';
import { CreateRefreshTokenCommand } from './create-refresh-token.command';
import { CreateRefreshTokenService } from './create-refresh-token.service';

describe('CreateRefreshTokenCommandHandler', () =>
{
    let commandHandler: CreateRefreshTokenCommandHandler;
    let service: CreateRefreshTokenService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateRefreshTokenCommandHandler,
                {
                    provide: CreateRefreshTokenService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateRefreshTokenCommandHandler>(CreateRefreshTokenCommandHandler);
        service         = module.get<CreateRefreshTokenService>(CreateRefreshTokenService);
    });

    describe('main', () =>
    {
        test('CreateRefreshTokenCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateRefreshTokenService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateRefreshTokenCommand(
                    {
                        id : refreshTokensToCreate[0].id,
                        accessTokenId : refreshTokensToCreate[0].accessTokenId,
                        expiredRefreshToken : refreshTokensToCreate[0].expiredRefreshToken,
                    }
                )
            )).toBe(undefined);
        });
    });
});