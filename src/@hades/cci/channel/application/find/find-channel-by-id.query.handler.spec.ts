import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindChannelByIdQueryHandler } from './find-channel-by-id.query-handler';
import { MockChannelRepository } from '@hades/cci/channel/infrastructure/mock/mock-channel.repository';
import { channels } from '@hades/cci/channel/infrastructure/seeds/channel.seed';
import { IChannelRepository } from '@hades/cci/channel/domain/channel.repository';
import { ChannelMapper } from '@hades/cci/channel/domain/channel.mapper';
import { FindChannelByIdQuery } from './find-channel-by-id.query';
import { FindChannelByIdService } from './find-channel-by-id.service';

describe('FindChannelByIdQueryHandler', () => 
{
    let queryHandler: FindChannelByIdQueryHandler;
    let service: FindChannelByIdService;
    let repository: MockChannelRepository;
    let mapper: ChannelMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindChannelByIdQueryHandler,
                {
                    provide: IChannelRepository,
                    useClass: MockChannelRepository
                },
                {
                    provide: FindChannelByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindChannelByIdQueryHandler>(FindChannelByIdQueryHandler);
        service         = module.get<FindChannelByIdService>(FindChannelByIdService);
        repository      = <MockChannelRepository>module.get<IChannelRepository>(IChannelRepository);
        mapper          = new ChannelMapper();
    });

    describe('main', () => 
    {
        test('FindChannelByIdQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an channel founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindChannelByIdQuery(
                    channels[0].id,
                
                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});