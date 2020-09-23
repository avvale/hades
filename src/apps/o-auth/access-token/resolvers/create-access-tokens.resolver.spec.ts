import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateAccessTokensResolver } from './create-access-tokens.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { accessTokens } from '@hades/o-auth/access-token/infrastructure/seeds/access-token.seed';
import { OAuthCreateAccessTokenInput } from './../../../../graphql';

describe('CreateAccessTokensResolver', () => 
{
    let resolver: CreateAccessTokensResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAccessTokensResolver,
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

        resolver    = module.get<CreateAccessTokensResolver>(CreateAccessTokensResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateAccessTokensResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateAccessTokensResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an accessTokens created', async () => 
        {
            expect(await resolver.main(<OAuthCreateAccessTokenInput[]>accessTokens)).toBe(true);
        });
    });
});