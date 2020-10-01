import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateDataLakeResolver } from './create-data-lake.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { dataLakes } from '@hades/cci/data-lake/infrastructure/seeds/data-lake.seed';
import { CciCreateDataLakeInput } from './../../../../graphql';

describe('CreateDataLakeResolver', () => 
{
    let resolver: CreateDataLakeResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateDataLakeResolver,
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

        resolver    = module.get<CreateDataLakeResolver>(CreateDataLakeResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateDataLakeResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateDataLakeResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an dataLake created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(dataLakes[0])));
            expect(await resolver.main(<CciCreateDataLakeInput>dataLakes[0])).toBe(dataLakes[0]);
        });
    });
});