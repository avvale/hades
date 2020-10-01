import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateRefreshTokenCommandHandler } from './update-refresh-token.command-handler';
import { refreshTokens } from '@hades/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';
import { UpdateRefreshTokenCommand } from './update-refresh-token.command';
import { UpdateRefreshTokenService } from './update-refresh-token.service';

describe('UpdateRefreshTokenCommandHandler', () => 
{
    let commandHandler: UpdateRefreshTokenCommandHandler;
    let service: UpdateRefreshTokenService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateRefreshTokenCommandHandler,
                {
                    provide: UpdateRefreshTokenService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateRefreshTokenCommandHandler>(UpdateRefreshTokenCommandHandler);
        service         = module.get<UpdateRefreshTokenService>(UpdateRefreshTokenService);
    });

    describe('main', () => 
    {
        test('UpdateRefreshTokenCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an refreshToken created', async () => 
        {
            expect(await commandHandler.execute(
                new UpdateRefreshTokenCommand(
                    refreshTokens[0].id,
                    refreshTokens[0].accessTokenId,
                    refreshTokens[0].token,
                    refreshTokens[0].isRevoked,
                    refreshTokens[0].expiresAt,
                    
                )
            )).toBe(undefined);
        });
    });
});