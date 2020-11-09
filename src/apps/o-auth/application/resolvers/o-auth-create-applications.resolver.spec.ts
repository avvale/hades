import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateApplicationsResolver } from './o-auth-create-applications.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { applications } from '@hades/o-auth/application/infrastructure/seeds/application.seed';
import { OAuthCreateApplicationInput } from './../../../../graphql';

describe('OAuthCreateApplicationsResolver', () => 
{
    let resolver: OAuthCreateApplicationsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateApplicationsResolver,
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

        resolver    = module.get<OAuthCreateApplicationsResolver>(OAuthCreateApplicationsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthCreateApplicationsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('OAuthCreateApplicationsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applications created', async () => 
        {
            expect(await resolver.main(<OAuthCreateApplicationInput[]>applications)).toBe(true);
        });
    });
});