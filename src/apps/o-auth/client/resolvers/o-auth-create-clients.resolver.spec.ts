import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateClientsResolver } from './o-auth-create-clients.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { clients } from '@hades/o-auth/client/infrastructure/seeds/client.seed';
import { OAuthCreateClientInput } from './../../../../graphql';

describe('OAuthCreateClientsResolver', () => 
{
    let resolver: OAuthCreateClientsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateClientsResolver,
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

        resolver    = module.get<OAuthCreateClientsResolver>(OAuthCreateClientsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthCreateClientsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('OAuthCreateClientsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an clients created', async () => 
        {
            expect(await resolver.main(<OAuthCreateClientInput[]>clients)).toBe(true);
        });
    });
});