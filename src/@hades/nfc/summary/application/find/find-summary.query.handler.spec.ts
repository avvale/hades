import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindSummaryQueryHandler } from './find-summary.query-handler';
import { MockSummaryRepository } from '@hades/nfc/summary/infrastructure/mock/mock-summary.repository';
import { ISummaryRepository } from '@hades/nfc/summary/domain/summary.repository';
import { SummaryMapper } from '@hades/nfc/summary/domain/summary.mapper';
import { FindSummaryQuery } from './find-summary.query';
import { FindSummaryService } from './find-summary.service';

describe('FindSummaryQueryHandler', () => 
{
    let queryHandler: FindSummaryQueryHandler;
    let service: FindSummaryService;
    let repository: MockSummaryRepository;
    let mapper: SummaryMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindSummaryQueryHandler,
                {
                    provide: ISummaryRepository,
                    useClass: MockSummaryRepository
                },
                {
                    provide: FindSummaryService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindSummaryQueryHandler>(FindSummaryQueryHandler);
        service         = module.get<FindSummaryService>(FindSummaryService);
        repository      = <MockSummaryRepository>module.get<ISummaryRepository>(ISummaryRepository);
        mapper          = new SummaryMapper();
    });

    describe('main', () => 
    {
        test('FindSummaryQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an summary founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindSummaryQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});