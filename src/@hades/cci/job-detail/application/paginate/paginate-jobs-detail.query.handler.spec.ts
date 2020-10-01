import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateJobsDetailQueryHandler } from './paginate-jobs-detail.query-handler';
import { MockJobDetailRepository } from '@hades/cci/job-detail/infrastructure/mock/mock-job-detail.repository';
import { IJobDetailRepository } from '@hades/cci/job-detail/domain/job-detail.repository';
import { JobDetailMapper } from '@hades/cci/job-detail/domain/job-detail.mapper';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateJobsDetailQuery } from './paginate-jobs-detail.query';
import { PaginateJobsDetailService } from './paginate-jobs-detail.service';

describe('PaginateJobsDetailQueryHandler', () => 
{
    let queryHandler: PaginateJobsDetailQueryHandler;
    let service: PaginateJobsDetailService;
    let repository: MockJobDetailRepository;
    let mapper: JobDetailMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateJobsDetailQueryHandler,
                {
                    provide: IJobDetailRepository,
                    useClass: MockJobDetailRepository
                },
                {
                    provide: PaginateJobsDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateJobsDetailQueryHandler>(PaginateJobsDetailQueryHandler);
        service         = module.get<PaginateJobsDetailService>(PaginateJobsDetailService);
        repository      = <MockJobDetailRepository>module.get<IJobDetailRepository>(IJobDetailRepository);
        mapper          = new JobDetailMapper();
    });

    describe('main', () => 
    {
        test('PaginateJobsDetailQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an jobsDetail paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateJobsDetailQuery(
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