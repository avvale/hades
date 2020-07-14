import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindSummaryResolver } from './find-summary.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed';

describe('FindSummaryResolver', () => 
{
    let resolver: FindSummaryResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindSummaryResolver,
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

        resolver    = module.get<FindSummaryResolver>(FindSummaryResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('FindSummaryResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('FindSummaryResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a summary', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(summaries[0])));
            expect(await resolver.main([])).toBe(summaries[0]);
        });
    });
});