import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { channels } from '@hades/cci/channel/infrastructure/seeds/channel.seed';
import { FindChannelByIdService } from './find-channel-by-id.service';
import { ChannelId } from './../../domain/value-objects';
import { IChannelRepository } from './../../domain/channel.repository';
import { MockChannelRepository } from './../../infrastructure/mock/mock-channel.repository';

describe('FindChannelByIdService', () =>
{
    let service: FindChannelByIdService;
    let repository: IChannelRepository;
    let mockRepository: MockChannelRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindChannelByIdService,
                MockChannelRepository,
                {
                    provide: IChannelRepository,
                    useValue: {
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindChannelByIdService);
        repository      = module.get(IChannelRepository);
        mockRepository  = module.get(MockChannelRepository);
    });

    describe('main', () =>
    {
        test('FindChannelByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find channel by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ChannelId(channels[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});