import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateSummaryResolver } from './update-summary.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed'

describe('UpdateSummaryResolver', () => 
{
    let resolver: UpdateSummaryResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateSummaryResolver,
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

        resolver  = module.get<UpdateSummaryResolver>(UpdateSummaryResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('UpdateSummaryResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('UpdateSummaryResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return a summary created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(summaries[0])));
            expect(await resolver.main(summaries[0])).toBe(summaries[0]);
        });
    });
});