import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteBoundedContextsResolver } from './delete-bounded-contexts.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { boundedContexts } from '@hades/admin/bounded-context/infrastructure/seeds/bounded-context.seed'

describe('DeleteBoundedContextsResolver', () => 
{
    let resolver: DeleteBoundedContextsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteBoundedContextsResolver,
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

        resolver    = module.get<DeleteBoundedContextsResolver>(DeleteBoundedContextsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteBoundedContextsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteBoundedContextsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an boundedContexts deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(boundedContexts)));
            expect(await resolver.main([])).toBe(boundedContexts);
        });
    });
});