import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { InsertJobsOverviewResolver } from './insert-jobs-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsOverview } from '@hades/bplus-it-sappi/job-overview/infrastructure/seeds/job-overview.seed';
import { BplusItSappiCreateJobOverviewInput } from './../../../../../src/graphql';

describe('InsertJobsOverviewResolver', () => 
{
    let resolver: InsertJobsOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InsertJobsOverviewResolver,
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

        resolver    = module.get<InsertJobsOverviewResolver>(InsertJobsOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('InsertJobsOverviewResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('InsertJobsOverviewResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        it('should return an jobsOverview created', async () => 
        {
            expect(await resolver.main(<BplusItSappiCreateJobOverviewInput[]>jobsOverview)).toBe(true);
        });
    });
});