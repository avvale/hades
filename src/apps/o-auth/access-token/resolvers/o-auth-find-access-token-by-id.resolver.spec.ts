import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindAccessTokenByIdResolver } from './o-auth-find-access-token-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { accessTokens } from '@hades/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthFindAccessTokenByIdResolver', () => 
{
    let resolver: OAuthFindAccessTokenByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthFindAccessTokenByIdResolver,
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

        resolver    = module.get<OAuthFindAccessTokenByIdResolver>(OAuthFindAccessTokenByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthFindAccessTokenByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('OAuthFindAccessTokenByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an accessToken by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await resolver.main(accessTokens[0].id)).toBe(accessTokens[0]);
        });
    });
});