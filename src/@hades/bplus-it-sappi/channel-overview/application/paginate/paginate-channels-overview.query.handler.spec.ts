import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateChannelsOverviewQueryHandler } from './paginate-channels-overview.query-handler';
import { MockChannelOverviewRepository } from '@hades/bplus-it-sappi/channel-overview/infrastructure/mock/mock-channel-overview.repository';
import { IChannelOverviewRepository } from '@hades/bplus-it-sappi/channel-overview/domain/channel-overview.repository';
import { ChannelOverviewMapper } from '@hades/bplus-it-sappi/channel-overview/domain/channel-overview.mapper';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateChannelsOverviewQuery } from './paginate-channels-overview.query';
import { PaginateChannelsOverviewService } from './paginate-channels-overview.service';

describe('PaginateChannelsOverviewQueryHandler', () => 
{
    let queryHandler: PaginateChannelsOverviewQueryHandler;
    let service: PaginateChannelsOverviewService;
    let repository: MockChannelOverviewRepository;
    let mapper: ChannelOverviewMapper;

    beforeEach(async () => 
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