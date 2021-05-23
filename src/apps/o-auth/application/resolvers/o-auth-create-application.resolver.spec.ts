import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateApplicationResolver } from './o-auth-create-application.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { applications } from '@hades/o-auth/application/infrastructure/seeds/application.seed';
import { OAuthCreateApplicationInput } from './../../../../graphql';

describe('OAuthCreateApplicationResolver', () =>
{
    let resolver: OAuthCreateApplicationResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateApplicationResolver,
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

        resolver    = module.get<OAuthCreateApplicationResolver>(OAuthCreateApplicationResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthCreateApplicationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthCreateApplicationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an application created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await resolver.main(<OAuthCreateApplicationInput>applications[0])).toBe(applications[0]);
        });
    });
});