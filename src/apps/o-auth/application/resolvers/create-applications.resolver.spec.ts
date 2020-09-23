import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateApplicationsResolver } from './create-applications.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { applications } from '@hades/o-auth/application/infrastructure/seeds/application.seed';
import { OAuthCreateApplicationInput } from './../../../../graphql';

describe('CreateApplicationsResolver', () => 
{
    let resolver: CreateApplicationsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateApplicationsResolver,
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

        resolver    = module.get<CreateApplicationsResolver>(CreateApplicationsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateApplicationsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateApplicationsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applications created', async () => 
        {
            expect(await resolver.main(<OAuthCreateApplicationInput[]>applications)).toBe(true);
        });
    });
});