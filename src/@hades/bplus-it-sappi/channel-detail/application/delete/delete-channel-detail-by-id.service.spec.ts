import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { channelsDetail } from '@hades/bplus-it-sappi/channel-detail/infrastructure/seeds/channel-detail.seed';
import { DeleteChannelDetailByIdService } from './delete-channel-detail-by-id.service';
import { ChannelDetailId } from './../../domain/value-objects';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';
import { MockChannelDetailRepository } from './../../infrastructure/mock/mock-channel-detail.repository';

describe('DeleteChannelDetailByIdService', () => 
{
    let service: DeleteChannelDetailByIdService;
    let repository: IChannelDetailRepository;
    let mockRepository: MockChannelDetailRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteChannelDetailByIdService,
                MockChannelDetailRepository,
                { 
                    provide: IChannelDetailRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteChannelDetailByIdService);
        repository      = module.get(IChannelDetailRepository);
        mockRepository  = module.get(MockChannelDetailRepository);
    });

    describe('main', () => 
    {
        test('DeleteChannelDetailByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete channelDetail and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ChannelDetailId(channelsDetail[0].id)
            )).toBe(undefined);
        });
    });
});