import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciUpdateExecutionResolver } from './cci-update-execution.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { executions } from '@hades/cci/execution/infrastructure/seeds/execution.seed';
import { CciUpdateExecutionInput } from './../../../../graphql';

describe('CciUpdateExecutionResolver', () => 
{
    let resolver: CciUpdateExecutionResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciUpdateExecutionResolver,
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

        resolver  = module.get<CciUpdateExecutionResolver>(CciUpdateExecutionResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciUpdateExecutionResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciUpdateExecutionResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a execution created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(executions[0])));
            expect(await resolver.main(<CciUpdateExecutionInput>executions[0])).toBe(executions[0]);
        });
    });
});