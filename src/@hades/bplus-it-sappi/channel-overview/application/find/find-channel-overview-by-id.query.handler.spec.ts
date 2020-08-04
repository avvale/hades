import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindChannelOverviewByIdQueryHandler } from './find-channel-overview-by-id.query-handler';
import { MockChannelOverviewRepository } from '@hades/bplus-it-sappi/channel-overview/infrastructure/mock/mock-channel-overview.repository';
import { channelsOverview } from '@hades/bplus-it-sappi/channel-overview/infrastructure/seeds/channel-overview.seed';
import { IChannelOverviewRepository } from '@hades/bplus-it-sappi/channel-overview/domain/channel-overview.repository';
import { ChannelOverviewMapper } from '@hades/bplus-it-sappi/channel-overview/domain/channel-overview.mapper';
import { FindChannelOverviewByIdQuery } from './find-channel-overview-by-id.query';
import { FindChannelOverviewByIdService } from './find-channel-overview-by-id.service';

describe('FindChannelOverviewByIdQueryHandler', () => 
{
    let queryHandler: FindChannelOverviewByIdQueryHandler;
    let service: FindChannelOverviewByIdService;
    let repository: MockChannelOverviewRepository;
    let mapper: ChannelOverviewMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindChannelOverviewByIdQueryHandler,
                {
                    provide: IChannelOverviewRepository,
                    useClass: MockChannelOverviewRepository
                },
                {
                    provide: FindChannelOverviewByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindChannelOverviewByIdQueryHandler>(FindChannelOverviewByIdQueryHandler);
        service         = module.get<FindChannelOverviewByIdService>(FindChannelOverviewByIdService);
        repository      = <MockChannelOverviewRepository>module.get<IChannelOverviewRepository>(IChannelOverviewRepository);
        mapper          = new ChannelOverviewMapper();
    });

    describe('main', () => 
    {
        test('FindChannelOverviewByIdQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an channelOverview founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindChannelOverviewByIdQuery(
                    channelsOverview[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});