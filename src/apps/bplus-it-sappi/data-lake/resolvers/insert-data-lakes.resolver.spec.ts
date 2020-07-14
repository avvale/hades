import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertDataLakesResolver } from './insert-data-lakes.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { dataLakes } from '@hades/bplus-it-sappi/data-lake/infrastructure/seeds/data-lake.seed'
import { BplusItSappiCreateDataLakeInput } from './../../../../../src/graphql';

describe('InsertDataLakesResolver', () => 
{
    let resolver: InsertDataLakesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertDataLakesResolver,
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

        resolver    = module.get<InsertDataLakesResolver>(InsertDataLakesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertDataLakesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertDataLakesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an dataLakes created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateDataLakeInput[]>dataLakes)).toBe(true);
        });
    });
});