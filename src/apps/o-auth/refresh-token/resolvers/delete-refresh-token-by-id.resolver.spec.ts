import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteRefreshTokenByIdResolver } from './delete-refresh-token-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { refreshTokens } from '@hades/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('DeleteRefreshTokenByIdResolver', () => 
{
    let resolver: DeleteRefreshTokenByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteRefreshTokenByIdResolver,
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

        resolver    = module.get<DeleteRefreshTokenByIdResolver>(DeleteRefreshTokenByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('DeleteRefreshTokenByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('DeleteRefreshTokenByIdResolver should be defined', () => 
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