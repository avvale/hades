import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateSummariesQueryHandler } from './paginate-summaries.query-handler';
import { MockSummaryRepository } from '@hades/nfc/summary/infrastructure/mock/mock-summary.repository';
import { ISummaryRepository } from '@hades/nfc/summary/domain/summary.repository';
import { SummaryMapper } from '@hades/nfc/summary/domain/summary.mapper';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateSummariesQuery } from './paginate-summaries.query';
import { PaginateSummariesService } from './paginate-summaries.service';

describe('PaginateSummariesQueryHandler', () => 
{
    let queryHandler: PaginateSummariesQueryHandler;
    let service: PaginateSummariesService;
    let repository: MockSummaryRepository;
    let mapper: SummaryMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateSummariesQueryHandler,
                {
                    provide: ISummaryRepository,
                    useClass: MockSummaryRepository
                },
                {
                    provide: PaginateSummariesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateSummariesQueryHandler>(PaginateSummariesQueryHandler);
        service         = module.get<PaginateSummariesService>(PaginateSummariesService);
        repository      = <MockSummaryRepository>module.get<ISummaryRepository>(ISummaryRepository);
        mapper          = new SummaryMapper();
    });

    describe('main', () => 
    {
        test('PaginateSummariesQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an summaries paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateSummariesQuery(
                    [
                        {
                            'command': Command.OFFSET,
                            'value': 0
                        },
                        {
                            'command': Command.LIMIT,
                            'value': 10
                        }
                    ]
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