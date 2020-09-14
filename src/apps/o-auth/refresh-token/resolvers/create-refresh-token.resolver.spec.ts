import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateRefreshTokenResolver } from './create-refresh-token.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { refreshTokens } from '@hades/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';
import { OAuthCreateRefreshTokenInput } from './../../../../graphql';

describe('CreateRefreshTokenResolver', () => 
{
    let resolver: CreateRefreshTokenResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateRefreshTokenResolver,
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

        resolver    = module.get<CreateRefreshTokenResolver>(CreateRefreshTokenResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateRefreshTokenResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateRefreshTokenResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an refreshToken created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await resolver.main(<OAuthCreateRefreshTokenInput>refreshTokens[0])).toBe(refreshTokens[0]);
        });
    });
});