import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetChannelsQueryHandler } from './get-channels.query-handler';
import { MockChannelRepository } from '@hades/cci/channel/infrastructure/mock/mock-channel.repository';
import { IChannelRepository } from '@hades/cci/channel/domain/channel.repository';
import { ChannelMapper } from '@hades/cci/channel/domain/channel.mapper';
import { GetChannelsQuery } from './get-channels.query';
import { GetChannelsService } from './get-channels.service';

describe('GetChannelsQueryHandler', () => 
{
    let queryHandler: GetChannelsQueryHandler;
    let service: GetChannelsService;
    let repository: MockChannelRepository;
    let mapper: ChannelMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetChannelsQueryHandler,
                {
                    provide: IChannelRepository,
                    useClass: MockChannelRepository
                },
                {
                    provide: GetChannelsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetChannelsQueryHandler>(GetChannelsQueryHandler);
        service         = module.get<GetChannelsService>(GetChannelsService);
        repository      = <MockChannelRepository>module.get<IChannelRepository>(IChannelRepository);
        mapper          = new ChannelMapper();
    });

    describe('main', () => 
    {
        test('GetChannelsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an channels founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetChannelsQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});