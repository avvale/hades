import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteApplicationsResolver } from './o-auth-delete-applications.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { applications } from '@hades/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthDeleteApplicationsResolver', () =>
{
    let resolver: OAuthDeleteApplicationsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteApplicationsResolver,
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

        resolver    = module.get<OAuthDeleteApplicationsResolver>(OAuthDeleteApplicationsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthDeleteApplicationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthDeleteApplicationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applications deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(applications)));
            expect(await resolver.main()).toBe(applications);
        });
    });
});