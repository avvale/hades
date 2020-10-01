import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetMessagesDetailQueryHandler } from './get-messages-detail.query-handler';
import { MockMessageDetailRepository } from '@hades/cci/message-detail/infrastructure/mock/mock-message-detail.repository';
import { IMessageDetailRepository } from '@hades/cci/message-detail/domain/message-detail.repository';
import { MessageDetailMapper } from '@hades/cci/message-detail/domain/message-detail.mapper';
import { GetMessagesDetailQuery } from './get-messages-detail.query';
import { GetMessagesDetailService } from './get-messages-detail.service';

describe('GetMessagesDetailQueryHandler', () => 
{
    let queryHandler: GetMessagesDetailQueryHandler;
    let service: GetMessagesDetailService;
    let repository: MockMessageDetailRepository;
    let mapper: MessageDetailMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetMessagesDetailQueryHandler,
                {
                    provide: IMessageDetailRepository,
                    useClass: MockMessageDetailRepository
                },
                {
                    provide: GetMessagesDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetMessagesDetailQueryHandler>(GetMessagesDetailQueryHandler);
        service         = module.get<GetMessagesDetailService>(GetMessagesDetailService);
        repository      = <MockMessageDetailRepository>module.get<IMessageDetailRepository>(IMessageDetailRepository);
        mapper          = new MessageDetailMapper();
    });

    describe('main', () => 
    {
        test('GetMessagesDetailQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an messagesDetail founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetMessagesDetailQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});