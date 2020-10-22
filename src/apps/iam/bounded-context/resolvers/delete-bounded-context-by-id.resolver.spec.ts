import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteBoundedContextByIdResolver } from './delete-bounded-context-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { boundedContexts } from '@hades/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('DeleteBoundedContextByIdResolver', () => 
{
    let resolver: DeleteBoundedContextByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteBoundedContextByIdResolver,
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

        resolver    = module.get<DeleteBoundedContextByIdResolver>(DeleteBoundedContextByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('DeleteBoundedContextByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('DeleteBoundedContextByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an boundedContext deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await resolver.main(boundedContexts[0].id)).toBe(boundedContexts[0]);
        });
    });
});