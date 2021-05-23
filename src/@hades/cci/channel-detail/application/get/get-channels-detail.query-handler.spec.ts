import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetChannelsDetailQueryHandler } from './get-channels-detail.query-handler';
import { MockChannelDetailRepository } from '@hades/cci/channel-detail/infrastructure/mock/mock-channel-detail.repository';
import { IChannelDetailRepository } from '@hades/cci/channel-detail/domain/channel-detail.repository';
import { ChannelDetailMapper } from '@hades/cci/channel-detail/domain/channel-detail.mapper';
import { GetChannelsDetailQuery } from './get-channels-detail.query';
import { GetChannelsDetailService } from './get-channels-detail.service';

describe('GetChannelsDetailQueryHandler', () =>
{
    let queryHandler: GetChannelsDetailQueryHandler;
    let service: GetChannelsDetailService;
    let repository: MockChannelDetailRepository;
    let mapper: ChannelDetailMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetChannelsDetailQueryHandler,
                {
                    provide: IChannelDetailRepository,
                    useClass: MockChannelDetailRepository
                },
                {
                    provide: GetChannelsDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetChannelsDetailQueryHandler>(GetChannelsDetailQueryHandler);
        service         = module.get<GetChannelsDetailService>(GetChannelsDetailService);
        repository      = <MockChannelDetailRepository>module.get<IChannelDetailRepository>(IChannelDetailRepository);
        mapper          = new ChannelDetailMapper();
    });

    describe('main', () =>
    {
        test('GetChannelsDetailQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an channelsDetail founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetChannelsDetailQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});