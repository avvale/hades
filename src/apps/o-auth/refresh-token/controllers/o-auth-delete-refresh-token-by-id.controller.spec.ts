import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteRefreshTokenByIdController } from './o-auth-delete-refresh-token-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { refreshTokens } from '@hades/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthDeleteRefreshTokenByIdController', () => 
{
    let controller: OAuthDeleteRefreshTokenByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OAuthDeleteRefreshTokenByIdController
            ],
            providers: [
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

        controller  = module.get<OAuthDeleteRefreshTokenByIdController>(OAuthDeleteRefreshTokenByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('OAuthDeleteRefreshTokenByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an refreshToken deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await controller.main(refreshTokens[0].id)).toBe(refreshTokens[0]);
        });
    });
});