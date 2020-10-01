import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateClientResolver } from './update-client.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { clients } from '@hades/o-auth/client/infrastructure/seeds/client.seed';
import { OAuthUpdateClientInput } from './../../../../graphql';

describe('UpdateClientResolver', () => 
{
    let resolver: UpdateClientResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateClientResolver,
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

        resolver  = module.get<UpdateClientResolver>(UpdateClientResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('UpdateClientResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('UpdateClientResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a client created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await resolver.main(<OAuthUpdateClientInput>clients[0])).toBe(clients[0]);
        });
    });
});