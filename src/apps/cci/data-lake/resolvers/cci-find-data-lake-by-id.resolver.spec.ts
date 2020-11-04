import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciFindDataLakeByIdResolver } from './cci-find-data-lake-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { dataLakes } from '@hades/cci/data-lake/infrastructure/seeds/data-lake.seed';

describe('CciFindDataLakeByIdResolver', () => 
{
    let resolver: CciFindDataLakeByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciFindDataLakeByIdResolver,
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

        resolver    = module.get<CciFindDataLakeByIdResolver>(CciFindDataLakeByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciFindDataLakeByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciFindDataLakeByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an dataLake by id', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(dataLakes[0])));
            expect(await resolver.main(dataLakes[0].id)).toBe(dataLakes[0]);
        });
    });
});