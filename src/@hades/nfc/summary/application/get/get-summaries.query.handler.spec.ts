import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetSummariesQueryHandler } from './get-summaries.query-handler';
import { MockSummaryRepository } from '@hades/nfc/summary/infrastructure/mock/mock-summary.repository';
import { ISummaryRepository } from '@hades/nfc/summary/domain/summary.repository';
import { SummaryMapper } from '@hades/nfc/summary/domain/summary.mapper';
import { GetSummariesQuery } from './get-summaries.query';
import { GetSummariesService } from './get-summaries.service';

describe('GetSummariesQueryHandler', () => 
{
    let queryHandler: GetSummariesQueryHandler;
    let service: GetSummariesService;
    let repository: MockSummaryRepository;
    let mapper: SummaryMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetSummariesQueryHandler,
                {
                    provide: ISummaryRepository,
                    useClass: MockSummaryRepository
                },
                {
                    provide: GetSummariesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetSummariesQueryHandler>(GetSummariesQueryHandler);
        service         = module.get<GetSummariesService>(GetSummariesService);
        repository      = <MockSummaryRepository>module.get<ISummaryRepository>(ISummaryRepository);
        mapper          = new SummaryMapper();
    });

    describe('main', () => 
    {
        test('GetSummariesQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an summaries founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetSummariesQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});