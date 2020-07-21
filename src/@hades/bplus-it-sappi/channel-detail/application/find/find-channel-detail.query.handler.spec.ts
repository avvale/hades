import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindChannelDetailQueryHandler } from './find-channel-detail.query-handler';
import { MockChannelDetailRepository } from '@hades/bplus-it-sappi/channel-detail/infrastructure/mock/mock-channel-detail.repository';
import { IChannelDetailRepository } from '@hades/bplus-it-sappi/channel-detail/domain/channel-detail.repository';
import { ChannelDetailMapper } from '@hades/bplus-it-sappi/channel-detail/domain/channel-detail.mapper';
import { FindChannelDetailQuery } from './find-channel-detail.query';
import { FindChannelDetailService } from './find-channel-detail.service';

describe('FindChannelDetailQueryHandler', () => 
{
    let queryHandler: FindChannelDetailQueryHandler;
    let service: FindChannelDetailService;
    let repository: MockChannelDetailRepository;
    let mapper: ChannelDetailMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindChannelDetailQueryHandler,
                {
                    provide: IChannelDetailRepository,
                    useClass: MockChannelDetailRepository
                },
                {
                    provide: FindChannelDetailService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindChannelDetailQueryHandler>(FindChannelDetailQueryHandler);
        service         = module.get<FindChannelDetailService>(FindChannelDetailService);
        repository      = <MockChannelDetailRepository>module.get<IChannelDetailRepository>(IChannelDetailRepository);
        mapper          = new ChannelDetailMapper();
    });

    describe('main', () => 
    {
        test('FindChannelDetailQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an channelDetail founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindChannelDetailQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});