import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindJobDetailByIdQueryHandler } from './find-job-detail-by-id.query-handler';
import { MockJobDetailRepository } from '@hades/bplus-it-sappi/job-detail/infrastructure/mock/mock-job-detail.repository';
import { jobsDetail } from '@hades/bplus-it-sappi/job-detail/infrastructure/seeds/job-detail.seed';
import { IJobDetailRepository } from '@hades/bplus-it-sappi/job-detail/domain/job-detail.repository';
import { JobDetailMapper } from '@hades/bplus-it-sappi/job-detail/domain/job-detail.mapper';
import { FindJobDetailByIdQuery } from './find-job-detail-by-id.query';
import { FindJobDetailByIdService } from './find-job-detail-by-id.service';

describe('FindJobDetailByIdQueryHandler', () => 
{
    let queryHandler: FindJobDetailByIdQueryHandler;
    let service: FindJobDetailByIdService;
    let repository: MockJobDetailRepository;
    let mapper: JobDetailMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindJobDetailByIdQueryHandler,
                {
                    provide: IJobDetailRepository,
                    useClass: MockJobDetailRepository
                },
                {
                    provide: FindJobDetailByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindJobDetailByIdQueryHandler>(FindJobDetailByIdQueryHandler);
        service         = module.get<FindJobDetailByIdService>(FindJobDetailByIdService);
        repository      = <MockJobDetailRepository>module.get<IJobDetailRepository>(IJobDetailRepository);
        mapper          = new JobDetailMapper();
    });

    describe('main', () => 
    {
        test('FindJobDetailByIdQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an jobDetail founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindJobDetailByIdQuery(
                    jobsDetail[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});