import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateRefreshTokensResolver } from './create-refresh-tokens.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { refreshTokens } from '@hades/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';
import { OAuthCreateRefreshTokenInput } from './../../../../graphql';

describe('CreateRefreshTokensResolver', () => 
{
    let resolver: CreateRefreshTokensResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateRefreshTokensResolver,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {},
                    }
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {},
                    }
                },
            ]
        }).compile();

        resolver    = module.get<CreateRefreshTokensResolver>(CreateRefreshTokensResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateRefreshTokensResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateRefreshTokensResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an refreshTokens created', async () => 
        {
            expect(await resolver.main(<OAuthCreateRefreshTokenInput[]>refreshTokens)).toBe(true);
        });
    });
});