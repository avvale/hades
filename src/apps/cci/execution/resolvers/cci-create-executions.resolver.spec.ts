import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateExecutionsResolver } from './cci-create-executions.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { executions } from '@hades/cci/execution/infrastructure/seeds/execution.seed';
import { CciCreateExecutionInput } from './../../../../graphql';

describe('CciCreateExecutionsResolver', () => 
{
    let resolver: CciCreateExecutionsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciCreateExecutionsResolver,
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

        resolver    = module.get<CciCreateExecutionsResolver>(CciCreateExecutionsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciCreateExecutionsResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciCreateExecutionsResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an executions created', async () => 
        {
            expect(await resolver.main(<CciCreateExecutionInput[]>executions)).toBe(true);
        });
    });
});