import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateApplicationResolver } from './o-auth-update-application.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { applications } from '@hades/o-auth/application/infrastructure/seeds/application.seed';
import { OAuthUpdateApplicationInput } from './../../../../graphql';

describe('OAuthUpdateApplicationResolver', () =>
{
    let resolver: OAuthUpdateApplicationResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthUpdateApplicationResolver,
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

        resolver  = module.get<OAuthUpdateApplicationResolver>(OAuthUpdateApplicationResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthUpdateApplicationResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateApplicationResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a application created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await resolver.main(<OAuthUpdateApplicationInput>applications[0])).toBe(applications[0]);
        });
    });
});