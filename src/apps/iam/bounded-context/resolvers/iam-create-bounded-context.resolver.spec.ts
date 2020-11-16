import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateBoundedContextResolver } from './iam-create-bounded-context.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { boundedContexts } from '@hades/iam/bounded-context/infrastructure/seeds/bounded-context.seed';
import { IamCreateBoundedContextInput } from './../../../../graphql';

describe('IamCreateBoundedContextResolver', () =>
{
    let resolver: IamCreateBoundedContextResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateBoundedContextResolver,
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

        resolver    = module.get<IamCreateBoundedContextResolver>(IamCreateBoundedContextResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamCreateBoundedContextResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('IamCreateBoundedContextResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an boundedContext created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await resolver.main(<IamCreateBoundedContextInput>boundedContexts[0])).toBe(boundedContexts[0]);
        });
    });
});