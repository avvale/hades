import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateRefreshTokenResolver } from './update-refresh-token.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { refreshTokens } from '@hades/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';
import { OAuthUpdateRefreshTokenInput } from './../../../../graphql';

describe('UpdateRefreshTokenResolver', () => 
{
    let resolver: UpdateRefreshTokenResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateRefreshTokenResolver,
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

        resolver  = module.get<UpdateRefreshTokenResolver>(UpdateRefreshTokenResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('UpdateRefreshTokenResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('UpdateRefreshTokenResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a refreshToken created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await resolver.main(<OAuthUpdateRefreshTokenInput>refreshTokens[0])).toBe(refreshTokens[0]);
        });
    });
});