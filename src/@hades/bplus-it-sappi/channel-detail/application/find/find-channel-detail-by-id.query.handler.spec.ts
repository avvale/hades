import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindChannelDetailByIdQueryHandler } from './find-channel-detail-by-id.query-handler';
import { MockChannelDetailRepository } from '@hades/bplus-it-sappi/channel-detail/infrastructure/mock/mock-channel-detail.repository';
import { channelsDetail } from '@hades/bplus-it-sappi/channel-detail/infrastructure/seeds/channel-detail.seed';
import { IChannelDetailRepository } from '@hades/bplus-it-sappi/channel-detail/domain/channel-detail.repository';
import { ChannelDetailMapper } from '@hades/bplus-it-sappi/channel-detail/domain/channel-detail.mapper';
import { FindChannelDetailByIdQuery } from './find-channel-detail-by-id.query';
import { FindChannelDetailByIdService } from './find-channel-detail-by-id.service';

describe('FindChannelDetailByIdQueryHandler', () => 
{
    let queryHandler: FindChannelDetailByIdQueryHandler;
    let service: FindChannelDetailByIdService;
    let repository: MockChannelDetailRepository;
    let mapper: ChannelDetailMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindChannelDetailByIdQueryHandler,
                {
                    provide: IChannelDetailRepository,
                    useClass: MockChannelDetailRepository
                },
                {
                    provide: FindChannelDetailByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindChannelDetailByIdQueryHandler>(FindChannelDetailByIdQueryHandler);
        service         = module.get<FindChannelDetailByIdService>(FindChannelDetailByIdService);
        repository      = <MockChannelDetailRepository>module.get<IChannelDetailRepository>(IChannelDetailRepository);
        mapper          = new ChannelDetailMapper();
    });

    describe('main', () => 
    {
        test('FindChannelDetailByIdQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an channelDetail founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindChannelDetailByIdQuery(
                    channelsDetail[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});