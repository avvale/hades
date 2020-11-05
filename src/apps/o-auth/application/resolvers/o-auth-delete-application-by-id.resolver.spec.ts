import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteApplicationByIdResolver } from './o-auth-delete-application-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { applications } from '@hades/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthDeleteApplicationByIdResolver', () => 
{
    let resolver: OAuthDeleteApplicationByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthDeleteApplicationByIdResolver,
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

        resolver    = module.get<OAuthDeleteApplicationByIdResolver>(OAuthDeleteApplicationByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthDeleteApplicationByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('OAuthDeleteApplicationByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an application deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await resolver.main(applications[0].id)).toBe(applications[0]);
        });
    });
});