import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateDataLakeResolver } from './update-data-lake.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { dataLakes } from '@hades/bplus-it-sappi/data-lake/infrastructure/seeds/data-lake.seed';
import { BplusItSappiUpdateDataLakeInput } from './../../../../graphql';

describe('UpdateDataLakeResolver', () => 
{
    let resolver: UpdateDataLakeResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateDataLakeResolver,
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

        resolver  = module.get<UpdateDataLakeResolver>(UpdateDataLakeResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('UpdateDataLakeResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('UpdateDataLakeResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a dataLake created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(dataLakes[0])));
            expect(await resolver.main(<BplusItSappiUpdateDataLakeInput>dataLakes[0])).toBe(dataLakes[0]);
        });
    });
});