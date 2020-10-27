import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindClientByIdResolver } from './find-client-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { clients } from '@hades/o-auth/client/infrastructure/seeds/client.seed';

describe('FindClientByIdResolver', () => 
{
    let resolver: FindClientByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindClientByIdResolver,
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

        resolver    = module.get<FindClientByIdResolver>(FindClientByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('FindClientByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('FindClientByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an client by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await resolver.main(clients[0].id)).toBe(clients[0]);
        });
    });
});