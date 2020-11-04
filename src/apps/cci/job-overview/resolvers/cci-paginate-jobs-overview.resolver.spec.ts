import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciPaginateJobsOverviewResolver } from './cci-paginate-jobs-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsOverview } from '@hades/cci/job-overview/infrastructure/seeds/job-overview.seed';

describe('CciPaginateJobsOverviewResolver', () => 
{
    let resolver: CciPaginateJobsOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciPaginateJobsOverviewResolver,
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

        resolver    = module.get<CciPaginateJobsOverviewResolver>(CciPaginateJobsOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciPaginateJobsOverviewResolver should be defined', () => 
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () => 
    {
        test('CciPaginateJobsOverviewResolver should be defined', () => 
        {
            expect(resolver).toBeDefined();
        });

        test('should return a jobsOverview', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(jobsOverview)));
            expect(await resolver.main()).toBe(jobsOverview);
        });
    });
});