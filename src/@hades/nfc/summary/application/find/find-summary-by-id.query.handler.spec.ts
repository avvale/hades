import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindSummaryByIdQueryHandler } from './find-summary-by-id.query-handler';
import { MockSummaryRepository } from '@hades/nfc/summary/infrastructure/mock/mock-summary.repository';
import { summaries } from '@hades/nfc/summary/infrastructure/seeds/summary.seed';
import { ISummaryRepository } from '@hades/nfc/summary/domain/summary.repository';
import { SummaryMapper } from '@hades/nfc/summary/domain/summary.mapper';
import { FindSummaryByIdQuery } from './find-summary-by-id.query';
import { FindSummaryByIdService } from './find-summary-by-id.service';

describe('FindSummaryByIdQueryHandler', () => 
{
    let queryHandler: FindSummaryByIdQueryHandler;
    let service: FindSummaryByIdService;
    let repository: MockSummaryRepository;
    let mapper: SummaryMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindSummaryByIdQueryHandler,
                {
                    provide: ISummaryRepository,
                    useClass: MockSummaryRepository
                },
                {
                    provide: FindSummaryByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindSummaryByIdQueryHandler>(FindSummaryByIdQueryHandler);
        service         = module.get<FindSummaryByIdService>(FindSummaryByIdService);
        repository      = <MockSummaryRepository>module.get<ISummaryRepository>(ISummaryRepository);
        mapper          = new SummaryMapper();
    });

    describe('main', () => 
    {
        test('FindSummaryByIdQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an summary founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindSummaryByIdQuery(
                    summaries[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});