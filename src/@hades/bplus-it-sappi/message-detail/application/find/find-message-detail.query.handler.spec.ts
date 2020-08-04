import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindMessageDetailQueryHandler } from './find-message-detail.query-handler';
import { MockMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/infrastructure/mock/mock-message-detail.repository';
import { IMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/domain/message-detail.repository';
import { MessageDetailMapper } from '@hades/bplus-it-sappi/message-detail/domain/message-detail.mapper';
import { FindMessageDetailQuery } from './find-message-detail.query';
import { FindMessageDetailService } from './find-message-detail.service';

describe('FindMessageDetailQueryHandler', () => 
{
    let queryHandler: FindMessageDetailQueryHandler;
    let service: FindMessageDetailService;
    let repository: MockMessageDetailRepository;
    let mapper: MessageDetailMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindMessageDetailQueryHandler,
                {
                    provide: IMessageDetailRepository,
                    useClass: MockMessageDetailRepository
                },
                {
                    provide: FindMessageDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindMessageDetailQueryHandler>(FindMessageDetailQueryHandler);
        service         = module.get<FindMessageDetailService>(FindMessageDetailService);
        repository      = <MockMessageDetailRepository>module.get<IMessageDetailRepository>(IMessageDetailRepository);
        mapper          = new MessageDetailMapper();
    });

    describe('main', () => 
    {
        test('FindMessageDetailQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an messageDetail founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindMessageDetailQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});