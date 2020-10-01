import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindChannelQueryHandler } from './find-channel.query-handler';
import { MockChannelRepository } from '@hades/cci/channel/infrastructure/mock/mock-channel.repository';
import { IChannelRepository } from '@hades/cci/channel/domain/channel.repository';
import { ChannelMapper } from '@hades/cci/channel/domain/channel.mapper';
import { FindChannelQuery } from './find-channel.query';
import { FindChannelService } from './find-channel.service';

describe('FindChannelQueryHandler', () => 
{
    let queryHandler: FindChannelQueryHandler;
    let service: FindChannelService;
    let repository: MockChannelRepository;
    let mapper: ChannelMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindChannelQueryHandler,
                {
                    provide: IChannelRepository,
                    useClass: MockChannelRepository
                },
                {
                    provide: FindChannelService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindChannelQueryHandler>(FindChannelQueryHandler);
        service         = module.get<FindChannelService>(FindChannelService);
        repository      = <MockChannelRepository>module.get<IChannelRepository>(IChannelRepository);
        mapper          = new ChannelMapper();
    });

    describe('main', () => 
    {
        test('FindChannelQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an channel founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindChannelQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});