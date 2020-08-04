import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { PaginateChannelsQueryHandler } from './paginate-channels.query-handler';
import { MockChannelRepository } from '@hades/bplus-it-sappi/channel/infrastructure/mock/mock-channel.repository';
import { IChannelRepository } from '@hades/bplus-it-sappi/channel/domain/channel.repository';
import { ChannelMapper } from '@hades/bplus-it-sappi/channel/domain/channel.mapper';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateChannelsQuery } from './paginate-channels.query';
import { PaginateChannelsService } from './paginate-channels.service';

describe('PaginateChannelsQueryHandler', () => 
{
    let queryHandler: PaginateChannelsQueryHandler;
    let service: PaginateChannelsService;
    let repository: MockChannelRepository;
    let mapper: ChannelMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateChannelsQueryHandler,
                {
                    provide: IChannelRepository,
                    useClass: MockChannelRepository
                },
                {
                    provide: PaginateChannelsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<PaginateChannelsQueryHandler>(PaginateChannelsQueryHandler);
        service         = module.get<PaginateChannelsService>(PaginateChannelsService);
        repository      = <MockChannelRepository>module.get<IChannelRepository>(IChannelRepository);
        mapper          = new ChannelMapper();
    });

    describe('main', () => 
    {
        test('PaginateChannelsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an channels paginated', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows: repository.collectionSource.slice(0,10)
                }
            )));
            expect(await queryHandler.execute(
                new PaginateChannelsQuery(
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