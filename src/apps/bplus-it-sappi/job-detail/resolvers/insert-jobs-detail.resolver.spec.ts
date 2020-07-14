import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertJobsDetailResolver } from './insert-jobs-detail.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsDetail } from '@hades/bplus-it-sappi/job-detail/infrastructure/seeds/job-detail.seed';
import { BplusItSappiCreateJobDetailInput } from './../../../../../src/graphql';

describe('InsertJobsDetailResolver', () => 
{
    let resolver: InsertJobsDetailResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertJobsDetailResolver,
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

        resolver    = module.get<InsertJobsDetailResolver>(InsertJobsDetailResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertJobsDetailResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertJobsDetailResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an jobsDetail created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateJobDetailInput[]>jobsDetail)).toBe(true);
        });
    });
});