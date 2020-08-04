import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetChannelsOverviewQueryHandler } from './get-channels-overview.query-handler';
import { MockChannelOverviewRepository } from '@hades/bplus-it-sappi/channel-overview/infrastructure/mock/mock-channel-overview.repository';
import { IChannelOverviewRepository } from '@hades/bplus-it-sappi/channel-overview/domain/channel-overview.repository';
import { ChannelOverviewMapper } from '@hades/bplus-it-sappi/channel-overview/domain/channel-overview.mapper';
import { GetChannelsOverviewQuery } from './get-channels-overview.query';
import { GetChannelsOverviewService } from './get-channels-overview.service';

describe('GetChannelsOverviewQueryHandler', () => 
{
    let queryHandler: GetChannelsOverviewQueryHandler;
    let service: GetChannelsOverviewService;
    let repository: MockChannelOverviewRepository;
    let mapper: ChannelOverviewMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetChannelsOverviewQueryHandler,
                {
                    provide: IChannelOverviewRepository,
                    useClass: MockChannelOverviewRepository
                },
                {
                    provide: GetChannelsOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetChannelsOverviewQueryHandler>(GetChannelsOverviewQueryHandler);
        service         = module.get<GetChannelsOverviewService>(GetChannelsOverviewService);
        repository      = <MockChannelOverviewRepository>module.get<IChannelOverviewRepository>(IChannelOverviewRepository);
        mapper          = new ChannelOverviewMapper();
    });

    describe('main', () => 
    {
        test('GetChannelsOverviewQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an channelsOverview founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetChannelsOverviewQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});