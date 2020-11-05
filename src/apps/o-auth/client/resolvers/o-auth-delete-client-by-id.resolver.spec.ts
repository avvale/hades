import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteClientByIdResolver } from './o-auth-delete-client-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { clients } from '@hades/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthDeleteClientByIdResolver', () => 
{
    let resolver: OAuthDeleteClientByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteClientByIdResolver,
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

        resolver    = module.get<OAuthDeleteClientByIdResolver>(OAuthDeleteClientByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthDeleteClientByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('OAuthDeleteClientByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an client deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await resolver.main(clients[0].id)).toBe(clients[0]);
        });
    });
});