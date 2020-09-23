import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateAccessTokensCommandHandler } from './create-access-tokens.command-handler';
import { accessTokens } from '@hades/o-auth/access-token/infrastructure/seeds/access-token.seed';
import { CreateAccessTokensCommand } from './create-access-tokens.command';
import { CreateAccessTokensService } from './create-access-tokens.service';

describe('CreateAccessTokensCommandHandler', () => 
{
    let commandHandler: CreateAccessTokensCommandHandler;
    let service: CreateAccessTokensService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAccessTokensCommandHandler,
                {
                    provide: CreateAccessTokensService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateAccessTokensCommandHandler>(CreateAccessTokensCommandHandler);
        service         = module.get<CreateAccessTokensService>(CreateAccessTokensService);
    });

    describe('main', () => 
    {
        test('CreateAccessTokensCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an accessToken created', async () => 
        {
            expect(await commandHandler.execute(
                new CreateAccessTokensCommand(
                    accessTokens
                
                )
            )).toBe(undefined);
        });
    });
});