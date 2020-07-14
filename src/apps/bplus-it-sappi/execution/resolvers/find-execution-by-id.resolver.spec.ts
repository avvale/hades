import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindExecutionByIdResolver } from './find-execution-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { executions } from '@hades/bplus-it-sappi/execution/infrastructure/seeds/execution.seed'

describe('FindExecutionByIdResolver', () => 
{
    let resolver: FindExecutionByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindExecutionByIdResolver,
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

        resolver    = module.get<FindExecutionByIdResolver>(FindExecutionByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindExecutionByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindExecutionByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an execution by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(executions[0])));
            expect(await resolver.main(executions[0].id)).toBe(executions[0]);
        });
    });
});