import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateBoundedContextsResolver } from './create-bounded-contexts.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { boundedContexts } from '@hades/admin/bounded-context/infrastructure/seeds/bounded-context.seed';
import { AdminCreateBoundedContextInput } from './../../../../../src/graphql';

describe('CreateBoundedContextsResolver', () => 
{
    let resolver: CreateBoundedContextsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateBoundedContextsResolver,
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

        resolver    = module.get<CreateBoundedContextsResolver>(CreateBoundedContextsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateBoundedContextsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateBoundedContextsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an boundedContexts created', async () => 
        {
            expect(await resolver.main(<AdminCreateBoundedContextInput[]>boundedContexts)).toBe(true);
        });
    });
});