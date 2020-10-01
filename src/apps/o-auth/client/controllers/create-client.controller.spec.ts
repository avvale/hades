import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateClientController } from './create-client.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { clients } from '@hades/o-auth/client/infrastructure/seeds/client.seed';

describe('CreateClientController', () => 
{
    let controller: CreateClientController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CreateClientController
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

        controller  = module.get<CreateClientController>(CreateClientController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => 
    {
        test('CreateClientController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        test('should return an client created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await controller.main(clients[0])).toBe(clients[0]);
        });
    });
});