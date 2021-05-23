import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CciCreateJobsOverviewResolver } from './cci-create-jobs-overview.resolver';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { jobsOverview } from '@hades/cci/job-overview/infrastructure/seeds/job-overview.seed';
import { CciCreateJobOverviewInput } from './../../../../graphql';

describe('CciCreateJobsOverviewResolver', () =>
{
    let resolver: CciCreateJobsOverviewResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CciCreateJobsOverviewResolver,
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

        resolver    = module.get<CciCreateJobsOverviewResolver>(CciCreateJobsOverviewResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CciCreateJobsOverviewResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CciCreateJobsOverviewResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an jobsOverview created', async () =>
        {
            expect(await resolver.main(<CciCreateJobOverviewInput[]>jobsOverview)).toBe(true);
        });
    });
});