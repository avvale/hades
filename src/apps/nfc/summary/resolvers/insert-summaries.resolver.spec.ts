import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertSummariesResolver } from './insert-summaries.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed'

describe('InsertSummariesResolver', () => 
{
    let resolver: InsertSummariesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertSummariesResolver,
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

        resolver    = module.get<InsertSummariesResolver>(InsertSummariesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertSummariesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertSummariesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an summaries created', async () => 
        {
            expect(await resolver.main(summaries)).toBe(true);
        });
    });
});