import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindJobOverviewByIdQueryHandler } from './find-job-overview-by-id.query-handler';
import { MockJobOverviewRepository } from '@hades/cci/job-overview/infrastructure/mock/mock-job-overview.repository';
import { jobsOverview } from '@hades/cci/job-overview/infrastructure/seeds/job-overview.seed';
import { IJobOverviewRepository } from '@hades/cci/job-overview/domain/job-overview.repository';
import { JobOverviewMapper } from '@hades/cci/job-overview/domain/job-overview.mapper';
import { FindJobOverviewByIdQuery } from './find-job-overview-by-id.query';
import { FindJobOverviewByIdService } from './find-job-overview-by-id.service';

describe('FindJobOverviewByIdQueryHandler', () =>
{
    let queryHandler: FindJobOverviewByIdQueryHandler;
    let service: FindJobOverviewByIdService;
    let repository: MockJobOverviewRepository;
    let mapper: JobOverviewMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindJobOverviewByIdQueryHandler,
                {
                    provide: IJobOverviewRepository,
                    useClass: MockJobOverviewRepository
                },
                {
                    provide: FindJobOverviewByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindJobOverviewByIdQueryHandler>(FindJobOverviewByIdQueryHandler);
        service         = module.get<FindJobOverviewByIdService>(FindJobOverviewByIdService);
        repository      = <MockJobOverviewRepository>module.get<IJobOverviewRepository>(IJobOverviewRepository);
        mapper          = new JobOverviewMapper();
    });

    describe('main', () =>
    {
        test('FindJobOverviewByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an jobOverview founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindJobOverviewByIdQuery(
                    jobsOverview[0].id,

                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});