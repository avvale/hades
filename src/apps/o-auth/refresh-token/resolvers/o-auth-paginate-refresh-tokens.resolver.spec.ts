import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthPaginateRefreshTokensResolver } from './o-auth-paginate-refresh-tokens.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { refreshTokens } from '@hades/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthPaginateRefreshTokensResolver', () =>
{
    let resolver: OAuthPaginateRefreshTokensResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthPaginateRefreshTokensResolver,
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

        resolver    = module.get<OAuthPaginateRefreshTokensResolver>(OAuthPaginateRefreshTokensResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthPaginateRefreshTokensResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthPaginateRefreshTokensResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a refreshTokens', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(refreshTokens)));
            expect(await resolver.main()).toBe(refreshTokens);
        });
    });
});