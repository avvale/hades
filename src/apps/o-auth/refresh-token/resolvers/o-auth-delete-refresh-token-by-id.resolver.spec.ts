import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteRefreshTokenByIdResolver } from './o-auth-delete-refresh-token-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { refreshTokens } from '@hades/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthDeleteRefreshTokenByIdResolver', () => 
{
    let resolver: OAuthDeleteRefreshTokenByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteRefreshTokenByIdResolver,
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

        resolver    = module.get<OAuthDeleteRefreshTokenByIdResolver>(OAuthDeleteRefreshTokenByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthDeleteRefreshTokenByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('OAuthDeleteRefreshTokenByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an refreshToken deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await resolver.main(refreshTokens[0].id)).toBe(refreshTokens[0]);
        });
    });
});