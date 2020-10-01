import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateExecutionsResolver } from './create-executions.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { executions } from '@hades/cci/execution/infrastructure/seeds/execution.seed';
import { CciCreateExecutionInput } from './../../../../graphql';

describe('CreateExecutionsResolver', () => 
{
    let resolver: CreateExecutionsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateExecutionsResolver,
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

        resolver    = module.get<CreateExecutionsResolver>(CreateExecutionsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateExecutionsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateExecutionsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an executions created', async () => 
        {
            expect(await resolver.main(<CciCreateExecutionInput[]>executions)).toBe(true);
        });
    });
});