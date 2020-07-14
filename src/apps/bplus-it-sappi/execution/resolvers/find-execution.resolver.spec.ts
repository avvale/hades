import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindExecutionResolver } from './find-execution.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { executions } from '@hades/bplus-it-sappi/execution/infrastructure/seeds/execution.seed';

describe('FindExecutionResolver', () => 
{
    let resolver: FindExecutionResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindExecutionResolver,
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

        resolver    = module.get<FindExecutionResolver>(FindExecutionResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindExecutionResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindExecutionResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a execution', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(executions[0])));
            expect(await resolver.main([])).toBe(executions[0]);
        });
    });
});