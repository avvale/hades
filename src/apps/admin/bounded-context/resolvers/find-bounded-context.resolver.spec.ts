import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindBoundedContextResolver } from './find-bounded-context.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { boundedContexts } from '@hades/admin/bounded-context/infrastructure/seeds/bounded-context.seed'

describe('FindBoundedContextResolver', () => 
{
    let resolver: FindBoundedContextResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindBoundedContextResolver,
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

        resolver    = module.get<FindBoundedContextResolver>(FindBoundedContextResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindBoundedContextResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindBoundedContextResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a boundedContext', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await resolver.main([])).toBe(boundedContexts[0]);
        });
    });
});