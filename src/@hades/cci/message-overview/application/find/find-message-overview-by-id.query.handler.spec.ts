import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindMessageOverviewByIdQueryHandler } from './find-message-overview-by-id.query-handler';
import { MockMessageOverviewRepository } from '@hades/cci/message-overview/infrastructure/mock/mock-message-overview.repository';
import { messagesOverview } from '@hades/cci/message-overview/infrastructure/seeds/message-overview.seed';
import { IMessageOverviewRepository } from '@hades/cci/message-overview/domain/message-overview.repository';
import { MessageOverviewMapper } from '@hades/cci/message-overview/domain/message-overview.mapper';
import { FindMessageOverviewByIdQuery } from './find-message-overview-by-id.query';
import { FindMessageOverviewByIdService } from './find-message-overview-by-id.service';

describe('FindMessageOverviewByIdQueryHandler', () => 
{
    let queryHandler: FindMessageOverviewByIdQueryHandler;
    let service: FindMessageOverviewByIdService;
    let repository: MockMessageOverviewRepository;
    let mapper: MessageOverviewMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindMessageOverviewByIdQueryHandler,
                {
                    provide: IMessageOverviewRepository,
                    useClass: MockMessageOverviewRepository
                },
                {
                    provide: FindMessageOverviewByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindMessageOverviewByIdQueryHandler>(FindMessageOverviewByIdQueryHandler);
        service         = module.get<FindMessageOverviewByIdService>(FindMessageOverviewByIdService);
        repository      = <MockMessageOverviewRepository>module.get<IMessageOverviewRepository>(IMessageOverviewRepository);
        mapper          = new MessageOverviewMapper();
    });

    describe('main', () =>
    {
        test('FindMessageOverviewByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an messageOverview founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindMessageOverviewByIdQuery(
                    messagesOverview[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});