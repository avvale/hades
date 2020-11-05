import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateClientResolver } from './o-auth-create-client.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { clients } from '@hades/o-auth/client/infrastructure/seeds/client.seed';
import { OAuthCreateClientInput } from './../../../../graphql';

describe('OAuthCreateClientResolver', () =>
{
    let resolver: OAuthCreateClientResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateClientResolver,
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

        resolver    = module.get<OAuthCreateClientResolver>(OAuthCreateClientResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthCreateClientResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('OAuthCreateClientResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an client created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(clients[0])));
            expect(await resolver.main(<OAuthCreateClientInput>clients[0])).toBe(clients[0]);
        });
    });
});