import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetMessagesOverviewQueryHandler } from './get-messages-overview.query-handler';
import { MockMessageOverviewRepository } from '@hades/cci/message-overview/infrastructure/mock/mock-message-overview.repository';
import { IMessageOverviewRepository } from '@hades/cci/message-overview/domain/message-overview.repository';
import { MessageOverviewMapper } from '@hades/cci/message-overview/domain/message-overview.mapper';
import { GetMessagesOverviewQuery } from './get-messages-overview.query';
import { GetMessagesOverviewService } from './get-messages-overview.service';

describe('GetMessagesOverviewQueryHandler', () => 
{
    let queryHandler: GetMessagesOverviewQueryHandler;
    let service: GetMessagesOverviewService;
    let repository: MockMessageOverviewRepository;
    let mapper: MessageOverviewMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetMessagesOverviewQueryHandler,
                {
                    provide: IMessageOverviewRepository,
                    useClass: MockMessageOverviewRepository
                },
                {
                    provide: GetMessagesOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetMessagesOverviewQueryHandler>(GetMessagesOverviewQueryHandler);
        service         = module.get<GetMessagesOverviewService>(GetMessagesOverviewService);
        repository      = <MockMessageOverviewRepository>module.get<IMessageOverviewRepository>(IMessageOverviewRepository);
        mapper          = new MessageOverviewMapper();
    });

    describe('main', () => 
    {
        test('GetMessagesOverviewQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an messagesOverview founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetMessagesOverviewQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});