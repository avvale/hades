import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteAccessTokensController } from './o-auth-delete-access-tokens.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { accessTokens } from '@hades/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthDeleteAccessTokensController', () => 
{
    let controller: OAuthDeleteAccessTokensController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OAuthDeleteAccessTokensController
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

        controller  = module.get<OAuthDeleteAccessTokensController>(OAuthDeleteAccessTokensController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('OAuthDeleteAccessTokensController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an accessTokens deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accessTokens)));
            expect(await controller.main()).toBe(accessTokens);
        });
    });
});