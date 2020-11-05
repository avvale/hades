import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthGetAccessTokensResolver } from './o-auth-get-access-tokens.resolver'; 
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { accessTokens } from '@hades/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthGetAccessTokensResolver', () => 
{
    let resolver:   OAuthGetAccessTokensResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthGetAccessTokensResolver,
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

        resolver    = module.get<OAuthGetAccessTokensResolver>(OAuthGetAccessTokensResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthGetAccessTokensResolver should be defined', () => 
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () => 
    {
        test('OAuthGetAccessTokensResolver should be defined', () => 
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a accessTokens', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accessTokens)));
            expect(await resolver.main()).toBe(accessTokens);
        });
    });
});