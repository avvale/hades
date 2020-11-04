import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { channelsDetail } from '@hades/cci/channel-detail/infrastructure/seeds/channel-detail.seed';
import { FindChannelDetailByIdService } from './find-channel-detail-by-id.service';
import { ChannelDetailId } from './../../domain/value-objects';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';
import { MockChannelDetailRepository } from './../../infrastructure/mock/mock-channel-detail.repository';

describe('FindChannelDetailByIdService', () =>
{
    let service: FindChannelDetailByIdService;
    let repository: IChannelDetailRepository;
    let mockRepository: MockChannelDetailRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindChannelDetailByIdService,
                MockChannelDetailRepository,
                {
                    provide: IChannelDetailRepository,
                    useValue: {
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindChannelDetailByIdService);
        repository      = module.get(IChannelDetailRepository);
        mockRepository  = module.get(MockChannelDetailRepository);
    });

    describe('main', () => 
    {
        test('FindChannelDetailByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find channelDetail by id', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ChannelDetailId(channelsDetail[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});