import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateApplicationResolver } from './create-application.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { applications } from '@hades/o-auth/application/infrastructure/seeds/application.seed';
import { OAuthCreateApplicationInput } from './../../../../graphql';

describe('CreateApplicationResolver', () => 
{
    let resolver: CreateApplicationResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateApplicationResolver,
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

        resolver    = module.get<CreateApplicationResolver>(CreateApplicationResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateApplicationResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateApplicationResolver should be defined', () => 
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