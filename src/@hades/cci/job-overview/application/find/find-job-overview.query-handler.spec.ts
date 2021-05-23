import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindJobOverviewQueryHandler } from './find-job-overview.query-handler';
import { MockJobOverviewRepository } from '@hades/cci/job-overview/infrastructure/mock/mock-job-overview.repository';
import { IJobOverviewRepository } from '@hades/cci/job-overview/domain/job-overview.repository';
import { JobOverviewMapper } from '@hades/cci/job-overview/domain/job-overview.mapper';
import { FindJobOverviewQuery } from './find-job-overview.query';
import { FindJobOverviewService } from './find-job-overview.service';

describe('FindJobOverviewQueryHandler', () =>
{
    let queryHandler: FindJobOverviewQueryHandler;
    let service: FindJobOverviewService;
    let repository: MockJobOverviewRepository;
    let mapper: JobOverviewMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindJobOverviewQueryHandler,
                {
                    provide: IJobOverviewRepository,
                    useClass: MockJobOverviewRepository
                },
                {
                    provide: FindJobOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindJobOverviewQueryHandler>(FindJobOverviewQueryHandler);
        service         = module.get<FindJobOverviewService>(FindJobOverviewService);
        repository      = <MockJobOverviewRepository>module.get<IJobOverviewRepository>(IJobOverviewRepository);
        mapper          = new JobOverviewMapper();
    });

    describe('main', () =>
    {
        test('FindJobOverviewQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an jobOverview founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindJobOverviewQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});