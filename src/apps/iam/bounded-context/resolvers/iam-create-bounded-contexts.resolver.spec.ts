import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateBoundedContextsResolver } from './iam-create-bounded-contexts.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { boundedContexts } from '@hades/iam/bounded-context/infrastructure/seeds/bounded-context.seed';
import { IamCreateBoundedContextInput } from './../../../../graphql';

describe('IamCreateBoundedContextsResolver', () => 
{
    let resolver: IamCreateBoundedContextsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateBoundedContextsResolver,
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

        resolver    = module.get<IamCreateBoundedContextsResolver>(IamCreateBoundedContextsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamCreateBoundedContextsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('IamCreateBoundedContextsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an boundedContexts created', async () => 
        {
            expect(await resolver.main(<IamCreateBoundedContextInput[]>boundedContexts)).toBe(true);
        });
    });
});