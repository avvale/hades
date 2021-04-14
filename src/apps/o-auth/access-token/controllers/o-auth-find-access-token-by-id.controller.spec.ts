import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindAccessTokenByIdController } from './o-auth-find-access-token-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { accessTokens } from '@hades/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthFindAccessTokenByIdController', () =>
{
    let controller: OAuthFindAccessTokenByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OAuthFindAccessTokenByIdController
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

        controller  = module.get<OAuthFindAccessTokenByIdController>(OAuthFindAccessTokenByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('OAuthFindAccessTokenByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an accessToken by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await controller.main(accessTokens[0].id)).toBe(accessTokens[0]);
        });
    });
});