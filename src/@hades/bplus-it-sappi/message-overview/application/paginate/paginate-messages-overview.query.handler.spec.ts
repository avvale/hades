import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateMessagesOverviewQueryHandler } from './paginate-messages-overview.query-handler';
import { MockMessageOverviewRepository } from '@hades/bplus-it-sappi/message-overview/infrastructure/mock/mock-message-overview.repository';
import { IMessageOverviewRepository } from '@hades/bplus-it-sappi/message-overview/domain/message-overview.repository';
import { MessageOverviewMapper } from '@hades/bplus-it-sappi/message-overview/domain/message-overview.mapper';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateMessagesOverviewQuery } from './paginate-messages-overview.query';
import { PaginateMessagesOverviewService } from './paginate-messages-overview.service';

describe('PaginateMessagesOverviewQueryHandler', () => 
{
    let queryHandler: PaginateMessagesOverviewQueryHandler;
    let service: PaginateMessagesOverviewService;
    let repository: MockMessageOverviewRepository;
    let mapper: MessageOverviewMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateMessagesOverviewQueryHandler,
                {
                    provide: IMessageOverviewRepository,
                    useClass: MockMessageOverviewRepository
                },
                {
                    provide: PaginateMessagesOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateMessagesOverviewQueryHandler>(PaginateMessagesOverviewQueryHandler);
        service         = module.get<PaginateMessagesOverviewService>(PaginateMessagesOverviewService);
        repository      = <MockMessageOverviewRepository>module.get<IMessageOverviewRepository>(IMessageOverviewRepository);
        mapper          = new MessageOverviewMapper();
    });

    describe('main', () => 
    {
        test('PaginateMessagesOverviewQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an messagesOverview paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateMessagesOverviewQuery(
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