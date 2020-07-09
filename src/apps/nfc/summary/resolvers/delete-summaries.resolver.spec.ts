import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteSummariesResolver } from './delete-summaries.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed'

describe('DeleteSummariesResolver', () => 
{
    let resolver: DeleteSummariesResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteSummariesResolver,
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

        resolver    = module.get<DeleteSummariesResolver>(DeleteSummariesResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('DeleteSummariesResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        it('DeleteSummariesResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an summaries deleted', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(summaries)));
            expect(await resolver.main([])).toBe(summaries);
        });
    });
});