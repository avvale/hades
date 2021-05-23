import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciUpdateDataLakeResolver } from './cci-update-data-lake.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { dataLakes } from '@hades/cci/data-lake/infrastructure/seeds/data-lake.seed';
import { CciUpdateDataLakeInput } from './../../../../graphql';

describe('CciUpdateDataLakeResolver', () =>
{
    let resolver: CciUpdateDataLakeResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciUpdateDataLakeResolver,
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

        resolver    = module.get<CciUpdateDataLakeResolver>(CciUpdateDataLakeResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciUpdateDataLakeResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciUpdateDataLakeResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a dataLake created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(dataLakes[0])));
            expect(await resolver.main(<CciUpdateDataLakeInput>dataLakes[0])).toBe(dataLakes[0]);
        });
    });
});