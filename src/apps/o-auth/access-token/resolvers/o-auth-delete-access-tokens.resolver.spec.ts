import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteAccessTokensResolver } from './o-auth-delete-access-tokens.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { accessTokens } from '@hades/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthDeleteAccessTokensResolver', () => 
{
    let resolver: OAuthDeleteAccessTokensResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteAccessTokensResolver,
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

        resolver    = module.get<OAuthDeleteAccessTokensResolver>(OAuthDeleteAccessTokensResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthDeleteAccessTokensResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('OAuthDeleteAccessTokensResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an accessTokens deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accessTokens)));
            expect(await resolver.main()).toBe(accessTokens);
        });
    });
});