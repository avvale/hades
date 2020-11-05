import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindRefreshTokenByIdController } from './o-auth-find-refresh-token-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { refreshTokens } from '@hades/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthFindRefreshTokenByIdController', () => 
{
    let controller: OAuthFindRefreshTokenByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OAuthFindRefreshTokenByIdController
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

        controller  = module.get<OAuthFindRefreshTokenByIdController>(OAuthFindRefreshTokenByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('OAuthFindRefreshTokenByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an refreshToken by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await controller.main(refreshTokens[0].id)).toBe(refreshTokens[0]);
        });
    });
});