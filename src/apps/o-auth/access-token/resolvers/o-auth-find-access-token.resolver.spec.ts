import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindAccessTokenResolver } from './o-auth-find-access-token.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { accessTokens } from '@hades/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthFindAccessTokenResolver', () => 
{
    let resolver: OAuthFindAccessTokenResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthFindAccessTokenResolver,
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

        resolver    = module.get<OAuthFindAccessTokenResolver>(OAuthFindAccessTokenResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthFindAccessTokenResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('OAuthFindAccessTokenResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a accessToken', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await resolver.main()).toBe(accessTokens[0]);
        });
    });
});