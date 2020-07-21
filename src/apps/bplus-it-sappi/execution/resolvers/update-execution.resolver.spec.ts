import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateExecutionResolver } from './update-execution.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { executions } from '@hades/bplus-it-sappi/execution/infrastructure/seeds/execution.seed';
import { BplusItSappiUpdateExecutionInput } from './../../../../graphql';

describe('UpdateExecutionResolver', () => 
{
    let resolver: UpdateExecutionResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateExecutionResolver,
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

        resolver  = module.get<UpdateExecutionResolver>(UpdateExecutionResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('UpdateExecutionResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('UpdateExecutionResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a execution created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(executions[0])));
            expect(await resolver.main(<BplusItSappiUpdateExecutionInput>executions[0])).toBe(executions[0]);
        });
    });
});