import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateRefreshTokensController } from './paginate-refresh-tokens.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { refreshTokens } from '@hades/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('PaginateRefreshTokensController', () => 
{
    let controller: PaginateRefreshTokensController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                PaginateRefreshTokensController
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

        controller  = module.get<PaginateRefreshTokensController>(PaginateRefreshTokensController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('PaginateRefreshTokensController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return a refreshTokens', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(refreshTokens)));
            expect(await controller.main()).toBe(refreshTokens);
        });
    });
});