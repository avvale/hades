import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteSummaryByIdResolver } from './delete-summary-by-id.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed';

describe('DeleteSummaryByIdResolver', () => 
{
    let resolver: DeleteSummaryByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteSummaryByIdResolver,
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

        resolver    = module.get<DeleteSummaryByIdResolver>(DeleteSummaryByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteSummaryByIdResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteSummaryByIdResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an summary deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(summaries[0])));
            expect(await resolver.main(summaries[0].id)).toBe(summaries[0]);
        });
    });
});