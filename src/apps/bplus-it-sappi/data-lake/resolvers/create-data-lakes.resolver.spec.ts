import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateDataLakesResolver } from './create-data-lakes.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { dataLakes } from '@hades/bplus-it-sappi/data-lake/infrastructure/seeds/data-lake.seed';
import { BplusItSappiCreateDataLakeInput } from './../../../../graphql';

describe('CreateDataLakesResolver', () => 
{
    let resolver: CreateDataLakesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateDataLakesResolver,
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

        resolver    = module.get<CreateDataLakesResolver>(CreateDataLakesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CreateDataLakesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CreateDataLakesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return an dataLakes created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateDataLakeInput[]>dataLakes)).toBe(true);
        });
    });
});