import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { PaginateChannelsService } from './paginate-channels.service';
import { IChannelRepository } from './../../domain/channel.repository';
import { MockChannelRepository } from './../../infrastructure/mock/mock-channel.repository';

describe('PaginateChannelsService', () =>
{
    let service: PaginateChannelsService;
    let repository: IChannelRepository;
    let mockRepository: MockChannelRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                PaginateChannelsService,
                MockChannelRepository,
                {
                    provide: IChannelRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(PaginateChannelsService);
        repository      = module.get(IChannelRepository);
        mockRepository  = module.get(MockChannelRepository);
    });

    describe('main', () =>
    {
        test('PaginateChannelsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate channels', async () =>
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            })));
            expect(await service.main({
                offset: 0,
                limit: 10
            })).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            });
        });
    });
});