import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetSummariesResolver } from './get-summaries.resolver'; 
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed';

describe('GetSummariesResolver', () => 
{
    let resolver:   GetSummariesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetSummariesResolver,
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

        resolver    = module.get<GetSummariesResolver>(GetSummariesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('GetSummariesResolver should be defined', () => 
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () => 
    {
        it('GetSummariesResolver should be defined', () => 
        {
            expect(resolver).   toBeDefined();
        });

        it('should return a summaries', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(summaries)));
            expect(await resolver.main([])).toBe(summaries);
        });
    });
});