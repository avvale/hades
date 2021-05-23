import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteClientsController } from './o-auth-delete-clients.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { clients } from '@hades/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthDeleteClientsController', () =>
{
    let controller: OAuthDeleteClientsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OAuthDeleteClientsController
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

        controller  = module.get<OAuthDeleteClientsController>(OAuthDeleteClientsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('OAuthDeleteClientsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an clients deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(clients)));
            expect(await controller.main()).toBe(clients);
        });
    });
});