import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindAccessTokenController } from './o-auth-find-access-token.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { accessTokens } from '@hades/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthFindAccessTokenController', () => 
{
    let controller: OAuthFindAccessTokenController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OAuthFindAccessTokenController
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

        controller  = module.get<OAuthFindAccessTokenController>(OAuthFindAccessTokenController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('OAuthFindAccessTokenController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a accessToken', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await controller.main()).toBe(accessTokens[0]);
        });
    });
});