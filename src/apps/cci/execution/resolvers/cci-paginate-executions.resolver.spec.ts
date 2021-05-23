import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciPaginateExecutionsResolver } from './cci-paginate-executions.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { executions } from '@hades/cci/execution/infrastructure/seeds/execution.seed';

describe('CciPaginateExecutionsResolver', () =>
{
    let resolver: CciPaginateExecutionsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciPaginateExecutionsResolver,
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

        resolver    = module.get<CciPaginateExecutionsResolver>(CciPaginateExecutionsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciPaginateExecutionsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciPaginateExecutionsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a executions', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(executions)));
            expect(await resolver.main()).toBe(executions);
        });
    });
});