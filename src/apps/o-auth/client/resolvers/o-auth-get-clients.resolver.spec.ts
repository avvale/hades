import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthGetClientsResolver } from './o-auth-get-clients.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { clients } from '@hades/o-auth/client/infrastructure/seeds/client.seed';

describe('OAuthGetClientsResolver', () =>
{
    let resolver:   OAuthGetClientsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthGetClientsResolver,
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

        resolver    = module.get<OAuthGetClientsResolver>(OAuthGetClientsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthGetClientsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthGetClientsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a clients', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(clients)));
            expect(await resolver.main()).toBe(clients);
        });
    });
});