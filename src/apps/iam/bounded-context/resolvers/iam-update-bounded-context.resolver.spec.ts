import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateBoundedContextResolver } from './iam-update-bounded-context.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { boundedContexts } from '@hades/iam/bounded-context/infrastructure/seeds/bounded-context.seed';
import { IamUpdateBoundedContextInput } from './../../../../graphql';

describe('IamUpdateBoundedContextResolver', () => 
{
    let resolver: IamUpdateBoundedContextResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateBoundedContextResolver,
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

        resolver  = module.get<IamUpdateBoundedContextResolver>(IamUpdateBoundedContextResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamUpdateBoundedContextResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('IamUpdateBoundedContextResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a boundedContext created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await resolver.main(<IamUpdateBoundedContextInput>boundedContexts[0])).toBe(boundedContexts[0]);
        });
    });
});