import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertExecutionsResolver } from './insert-executions.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { executions } from '@hades/bplus-it-sappi/execution/infrastructure/seeds/execution.seed';
import { BplusItSappiCreateExecutionInput } from './../../../../../src/graphql';

describe('InsertExecutionsResolver', () => 
{
    let resolver: InsertExecutionsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertExecutionsResolver,
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

        resolver    = module.get<InsertExecutionsResolver>(InsertExecutionsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertExecutionsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertExecutionsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an executions created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateExecutionInput[]>executions)).toBe(true);
        });
    });
});