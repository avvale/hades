import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateChannelsDetailQueryHandler } from './paginate-channels-detail.query-handler';
import { MockChannelDetailRepository } from '@hades/bplus-it-sappi/channel-detail/infrastructure/mock/mock-channel-detail.repository';
import { IChannelDetailRepository } from '@hades/bplus-it-sappi/channel-detail/domain/channel-detail.repository';
import { ChannelDetailMapper } from '@hades/bplus-it-sappi/channel-detail/domain/channel-detail.mapper';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateChannelsDetailQuery } from './paginate-channels-detail.query';
import { PaginateChannelsDetailService } from './paginate-channels-detail.service';

describe('PaginateChannelsDetailQueryHandler', () => 
{
    let queryHandler: PaginateChannelsDetailQueryHandler;
    let service: PaginateChannelsDetailService;
    let repository: MockChannelDetailRepository;
    let mapper: ChannelDetailMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateChannelsDetailQueryHandler,
                {
                    provide: IChannelDetailRepository,
                    useClass: MockChannelDetailRepository
                },
                {
                    provide: PaginateChannelsDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateChannelsDetailQueryHandler>(PaginateChannelsDetailQueryHandler);
        service         = module.get<PaginateChannelsDetailService>(PaginateChannelsDetailService);
        repository      = <MockChannelDetailRepository>module.get<IChannelDetailRepository>(IChannelDetailRepository);
        mapper          = new ChannelDetailMapper();
    });

    describe('main', () => 
    {
        test('PaginateChannelsDetailQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an channelsDetail paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateChannelsDetailQuery(
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