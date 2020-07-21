import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindJobDetailQueryHandler } from './find-job-detail.query-handler';
import { MockJobDetailRepository } from '@hades/bplus-it-sappi/job-detail/infrastructure/mock/mock-job-detail.repository';
import { IJobDetailRepository } from '@hades/bplus-it-sappi/job-detail/domain/job-detail.repository';
import { JobDetailMapper } from '@hades/bplus-it-sappi/job-detail/domain/job-detail.mapper';
import { FindJobDetailQuery } from './find-job-detail.query';
import { FindJobDetailService } from './find-job-detail.service';

describe('FindJobDetailQueryHandler', () => 
{
    let queryHandler: FindJobDetailQueryHandler;
    let service: FindJobDetailService;
    let repository: MockJobDetailRepository;
    let mapper: JobDetailMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindJobDetailQueryHandler,
                {
                    provide: IJobDetailRepository,
                    useClass: MockJobDetailRepository
                },
                {
                    provide: FindJobDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindJobDetailQueryHandler>(FindJobDetailQueryHandler);
        service         = module.get<FindJobDetailService>(FindJobDetailService);
        repository      = <MockJobDetailRepository>module.get<IJobDetailRepository>(IJobDetailRepository);
        mapper          = new JobDetailMapper();
    });

    describe('main', () => 
    {
        test('FindJobDetailQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an jobDetail founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindJobDetailQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});