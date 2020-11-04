import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateJobsOverviewQueryHandler } from './paginate-jobs-overview.query-handler';
import { MockJobOverviewRepository } from '@hades/cci/job-overview/infrastructure/mock/mock-job-overview.repository';
import { IJobOverviewRepository } from '@hades/cci/job-overview/domain/job-overview.repository';
import { JobOverviewMapper } from '@hades/cci/job-overview/domain/job-overview.mapper';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateJobsOverviewQuery } from './paginate-jobs-overview.query';
import { PaginateJobsOverviewService } from './paginate-jobs-overview.service';

describe('PaginateJobsOverviewQueryHandler', () =>
{
    let queryHandler: PaginateJobsOverviewQueryHandler;
    let service: PaginateJobsOverviewService;
    let repository: MockJobOverviewRepository;
    let mapper: JobOverviewMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateJobsOverviewQueryHandler,
                {
                    provide: IJobOverviewRepository,
                    useClass: MockJobOverviewRepository
                },
                {
                    provide: PaginateJobsOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateJobsOverviewQueryHandler>(PaginateJobsOverviewQueryHandler);
        service         = module.get<PaginateJobsOverviewService>(PaginateJobsOverviewService);
        repository      = <MockJobOverviewRepository>module.get<IJobOverviewRepository>(IJobOverviewRepository);
        mapper          = new JobOverviewMapper();
    });

    describe('main', () => 
    {
        test('PaginateJobsOverviewQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an jobsOverview paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateJobsOverviewQuery(
                    {
                        offset: 0,
                        limit: 10
                    }
                )
            )).toStrictEqual(
                new PaginationResponse(
                    100, 
                    10, 
                    repository.collectionSource.slice(0,10).map(item => item.toDTO())
                )
            );
        });
    });
});