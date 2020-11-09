import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindClientByIdController } from './o-auth-find-client-by-id.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { clients } from '@hades/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthFindClientByIdController', () => 
{
    let controller: OAuthFindClientByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OAuthFindClientByIdController
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

        controller  = module.get<OAuthFindClientByIdController>(OAuthFindClientByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('OAuthFindClientByIdController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an client by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await controller.main(clients[0].id)).toBe(clients[0]);
        });
    });
});