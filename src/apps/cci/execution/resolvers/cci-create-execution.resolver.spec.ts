import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateExecutionResolver } from './cci-create-execution.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { executions } from '@hades/cci/execution/infrastructure/seeds/execution.seed';
import { CciCreateExecutionInput } from './../../../../graphql';

describe('CciCreateExecutionResolver', () =>
{
    let resolver: CciCreateExecutionResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciCreateExecutionResolver,
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

        resolver    = module.get<CciCreateExecutionResolver>(CciCreateExecutionResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciCreateExecutionResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciCreateExecutionResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an execution created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(executions[0])));
            expect(await resolver.main(<CciCreateExecutionInput>executions[0])).toBe(executions[0]);
        });
    });
});