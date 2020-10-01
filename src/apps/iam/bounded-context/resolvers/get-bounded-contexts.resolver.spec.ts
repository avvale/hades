import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetBoundedContextsResolver } from './get-bounded-contexts.resolver'; 
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { boundedContexts } from '@hades/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('GetBoundedContextsResolver', () => 
{
    let resolver:   GetBoundedContextsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetBoundedContextsResolver,
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

        resolver    = module.get<GetBoundedContextsResolver>(GetBoundedContextsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('GetBoundedContextsResolver should be defined', () => 
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () => 
    {
        test('GetBoundedContextsResolver should be defined', () => 
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a boundedContexts', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(boundedContexts)));
            expect(await resolver.main()).toBe(boundedContexts);
        });
    });
});