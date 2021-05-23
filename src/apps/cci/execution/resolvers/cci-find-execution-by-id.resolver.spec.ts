import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciFindExecutionByIdResolver } from './cci-find-execution-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { executions } from '@hades/cci/execution/infrastructure/seeds/execution.seed';

describe('CciFindExecutionByIdResolver', () =>
{
    let resolver: CciFindExecutionByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciFindExecutionByIdResolver,
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

        resolver    = module.get<CciFindExecutionByIdResolver>(CciFindExecutionByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciFindExecutionByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciFindExecutionByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an execution by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(executions[0])));
            expect(await resolver.main(executions[0].id)).toBe(executions[0]);
        });
    });
});