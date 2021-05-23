import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciFindDataLakeResolver } from './cci-find-data-lake.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { dataLakes } from '@hades/cci/data-lake/infrastructure/seeds/data-lake.seed';

describe('CciFindDataLakeResolver', () =>
{
    let resolver: CciFindDataLakeResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciFindDataLakeResolver,
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

        resolver    = module.get<CciFindDataLakeResolver>(CciFindDataLakeResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciFindDataLakeResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciFindDataLakeResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a dataLake', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(dataLakes[0])));
            expect(await resolver.main()).toBe(dataLakes[0]);
        });
    });
});