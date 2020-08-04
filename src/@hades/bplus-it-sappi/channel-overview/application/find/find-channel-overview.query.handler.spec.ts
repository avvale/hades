import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindChannelOverviewQueryHandler } from './find-channel-overview.query-handler';
import { MockChannelOverviewRepository } from '@hades/bplus-it-sappi/channel-overview/infrastructure/mock/mock-channel-overview.repository';
import { IChannelOverviewRepository } from '@hades/bplus-it-sappi/channel-overview/domain/channel-overview.repository';
import { ChannelOverviewMapper } from '@hades/bplus-it-sappi/channel-overview/domain/channel-overview.mapper';
import { FindChannelOverviewQuery } from './find-channel-overview.query';
import { FindChannelOverviewService } from './find-channel-overview.service';

describe('FindChannelOverviewQueryHandler', () => 
{
    let queryHandler: FindChannelOverviewQueryHandler;
    let service: FindChannelOverviewService;
    let repository: MockChannelOverviewRepository;
    let mapper: ChannelOverviewMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindChannelOverviewQueryHandler,
                {
                    provide: IChannelOverviewRepository,
                    useClass: MockChannelOverviewRepository
                },
                {
                    provide: FindChannelOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindChannelOverviewQueryHandler>(FindChannelOverviewQueryHandler);
        service         = module.get<FindChannelOverviewService>(FindChannelOverviewService);
        repository      = <MockChannelOverviewRepository>module.get<IChannelOverviewRepository>(IChannelOverviewRepository);
        mapper          = new ChannelOverviewMapper();
    });

    describe('main', () => 
    {
        test('FindChannelOverviewQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an channelOverview founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindChannelOverviewQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});