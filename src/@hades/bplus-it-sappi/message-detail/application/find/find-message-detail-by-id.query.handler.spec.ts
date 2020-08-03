import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindMessageDetailByIdQueryHandler } from './find-message-detail-by-id.query-handler';
import { MockMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/infrastructure/mock/mock-message-detail.repository';
import { messagesDetail } from '@hades/bplus-it-sappi/message-detail/infrastructure/seeds/message-detail.seed';
import { IMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/domain/message-detail.repository';
import { MessageDetailMapper } from '@hades/bplus-it-sappi/message-detail/domain/message-detail.mapper';
import { FindMessageDetailByIdQuery } from './find-message-detail-by-id.query';
import { FindMessageDetailByIdService } from './find-message-detail-by-id.service';

describe('FindMessageDetailByIdQueryHandler', () => 
{
    let queryHandler: FindMessageDetailByIdQueryHandler;
    let service: FindMessageDetailByIdService;
    let repository: MockMessageDetailRepository;
    let mapper: MessageDetailMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindMessageDetailByIdQueryHandler,
                {
                    provide: IMessageDetailRepository,
                    useClass: MockMessageDetailRepository
                },
                {
                    provide: FindMessageDetailByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindMessageDetailByIdQueryHandler>(FindMessageDetailByIdQueryHandler);
        service         = module.get<FindMessageDetailByIdService>(FindMessageDetailByIdService);
        repository      = <MockMessageDetailRepository>module.get<IMessageDetailRepository>(IMessageDetailRepository);
        mapper          = new MessageDetailMapper();
    });

    describe('main', () => 
    {
        test('FindMessageDetailByIdQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an messageDetail founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindMessageDetailByIdQuery(
                    messagesDetail[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});