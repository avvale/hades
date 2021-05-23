import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateChannelsOverviewQueryHandler } from './paginate-channels-overview.query-handler';
import { MockChannelOverviewRepository } from '@hades/cci/channel-overview/infrastructure/mock/mock-channel-overview.repository';
import { IChannelOverviewRepository } from '@hades/cci/channel-overview/domain/channel-overview.repository';
import { ChannelOverviewMapper } from '@hades/cci/channel-overview/domain/channel-overview.mapper';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateChannelsOverviewQuery } from './paginate-channels-overview.query';
import { PaginateChannelsOverviewService } from './paginate-channels-overview.service';

describe('PaginateChannelsOverviewQueryHandler', () =>
{
    let queryHandler: PaginateChannelsOverviewQueryHandler;
    let service: PaginateChannelsOverviewService;
    let repository: MockChannelOverviewRepository;
    let mapper: ChannelOverviewMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateChannelsOverviewQueryHandler,
                {
                    provide: IChannelOverviewRepository,
                    useClass: MockChannelOverviewRepository
                },
                {
                    provide: PaginateChannelsOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateChannelsOverviewQueryHandler>(PaginateChannelsOverviewQueryHandler);
        service         = module.get<PaginateChannelsOverviewService>(PaginateChannelsOverviewService);
        repository      = <MockChannelOverviewRepository>module.get<IChannelOverviewRepository>(IChannelOverviewRepository);
        mapper          = new ChannelOverviewMapper();
    });

    describe('main', () =>
    {
        test('PaginateChannelsOverviewQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an channelsOverview paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateChannelsOverviewQuery(
                    {
                        offset: 0,
                        limit: 10
                    }
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