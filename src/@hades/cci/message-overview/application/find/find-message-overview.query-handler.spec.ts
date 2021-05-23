import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindMessageOverviewQueryHandler } from './find-message-overview.query-handler';
import { MockMessageOverviewRepository } from '@hades/cci/message-overview/infrastructure/mock/mock-message-overview.repository';
import { IMessageOverviewRepository } from '@hades/cci/message-overview/domain/message-overview.repository';
import { MessageOverviewMapper } from '@hades/cci/message-overview/domain/message-overview.mapper';
import { FindMessageOverviewQuery } from './find-message-overview.query';
import { FindMessageOverviewService } from './find-message-overview.service';

describe('FindMessageOverviewQueryHandler', () =>
{
    let queryHandler: FindMessageOverviewQueryHandler;
    let service: FindMessageOverviewService;
    let repository: MockMessageOverviewRepository;
    let mapper: MessageOverviewMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindMessageOverviewQueryHandler,
                {
                    provide: IMessageOverviewRepository,
                    useClass: MockMessageOverviewRepository
                },
                {
                    provide: FindMessageOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindMessageOverviewQueryHandler>(FindMessageOverviewQueryHandler);
        service         = module.get<FindMessageOverviewService>(FindMessageOverviewService);
        repository      = <MockMessageOverviewRepository>module.get<IMessageOverviewRepository>(IMessageOverviewRepository);
        mapper          = new MessageOverviewMapper();
    });

    describe('main', () =>
    {
        test('FindMessageOverviewQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an messageOverview founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindMessageOverviewQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});