import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetJobsDetailQueryHandler } from './get-jobs-detail.query-handler';
import { MockJobDetailRepository } from '@hades/cci/job-detail/infrastructure/mock/mock-job-detail.repository';
import { IJobDetailRepository } from '@hades/cci/job-detail/domain/job-detail.repository';
import { JobDetailMapper } from '@hades/cci/job-detail/domain/job-detail.mapper';
import { GetJobsDetailQuery } from './get-jobs-detail.query';
import { GetJobsDetailService } from './get-jobs-detail.service';

describe('GetJobsDetailQueryHandler', () =>
{
    let queryHandler: GetJobsDetailQueryHandler;
    let service: GetJobsDetailService;
    let repository: MockJobDetailRepository;
    let mapper: JobDetailMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetJobsDetailQueryHandler,
                {
                    provide: IJobDetailRepository,
                    useClass: MockJobDetailRepository
                },
                {
                    provide: GetJobsDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetJobsDetailQueryHandler>(GetJobsDetailQueryHandler);
        service         = module.get<GetJobsDetailService>(GetJobsDetailService);
        repository      = <MockJobDetailRepository>module.get<IJobDetailRepository>(IJobDetailRepository);
        mapper          = new JobDetailMapper();
    });

    describe('main', () =>
    {
        test('GetJobsDetailQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an jobsDetail founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetJobsDetailQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});