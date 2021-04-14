import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateRefreshTokensCommandHandler } from './create-refresh-tokens.command-handler';
import { refreshTokens } from '@hades/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';
import { CreateRefreshTokensCommand } from './create-refresh-tokens.command';
import { CreateRefreshTokensService } from './create-refresh-tokens.service';

describe('CreateRefreshTokensCommandHandler', () =>
{
    let commandHandler: CreateRefreshTokensCommandHandler;
    let service: CreateRefreshTokensService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateRefreshTokensCommandHandler,
                {
                    provide: CreateRefreshTokensService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateRefreshTokensCommandHandler>(CreateRefreshTokensCommandHandler);
        service         = module.get<CreateRefreshTokensService>(CreateRefreshTokensService);
    });

    describe('main', () =>
    {
        test('CreateRefreshTokensCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an refreshToken created', async () =>
        {
            expect(await commandHandler.execute(
                new CreateRefreshTokensCommand(
                    refreshTokens

                )
            )).toBe(undefined);
        });
    });
});