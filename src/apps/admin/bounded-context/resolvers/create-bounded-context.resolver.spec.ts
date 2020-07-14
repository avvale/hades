import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateBoundedContextResolver } from './create-bounded-context.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { boundedContexts } from '@hades/admin/bounded-context/infrastructure/seeds/bounded-context.seed'
import { AdminCreateBoundedContextInput } from './../../../../../src/graphql';

describe('CreateBoundedContextResolver', () => 
{
    let resolver: CreateBoundedContextResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateBoundedContextResolver,
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

        resolver    = module.get<CreateBoundedContextResolver>(CreateBoundedContextResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('CreateBoundedContextResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('CreateBoundedContextResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an boundedContext created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await resolver.main(<AdminCreateBoundedContextInput>boundedContexts[0])).toBe(boundedContexts[0]);
        });
    });
});