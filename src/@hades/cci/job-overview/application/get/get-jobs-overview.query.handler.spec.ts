import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetJobsOverviewQueryHandler } from './get-jobs-overview.query-handler';
import { MockJobOverviewRepository } from '@hades/cci/job-overview/infrastructure/mock/mock-job-overview.repository';
import { IJobOverviewRepository } from '@hades/cci/job-overview/domain/job-overview.repository';
import { JobOverviewMapper } from '@hades/cci/job-overview/domain/job-overview.mapper';
import { GetJobsOverviewQuery } from './get-jobs-overview.query';
import { GetJobsOverviewService } from './get-jobs-overview.service';

describe('GetJobsOverviewQueryHandler', () => 
{
    let queryHandler: GetJobsOverviewQueryHandler;
    let service: GetJobsOverviewService;
    let repository: MockJobOverviewRepository;
    let mapper: JobOverviewMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetJobsOverviewQueryHandler,
                {
                    provide: IJobOverviewRepository,
                    useClass: MockJobOverviewRepository
                },
                {
                    provide: GetJobsOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetJobsOverviewQueryHandler>(GetJobsOverviewQueryHandler);
        service         = module.get<GetJobsOverviewService>(GetJobsOverviewService);
        repository      = <MockJobOverviewRepository>module.get<IJobOverviewRepository>(IJobOverviewRepository);
        mapper          = new JobOverviewMapper();
    });

    describe('main', () => 
    {
        test('GetJobsOverviewQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an jobsOverview founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetJobsOverviewQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});