import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { channels } from '@hades/cci/channel/infrastructure/seeds/channel.seed';
import { DeleteChannelByIdService } from './delete-channel-by-id.service';
import { ChannelId } from './../../domain/value-objects';
import { IChannelRepository } from './../../domain/channel.repository';
import { MockChannelRepository } from './../../infrastructure/mock/mock-channel.repository';

describe('DeleteChannelByIdService', () => 
{
    let service: DeleteChannelByIdService;
    let repository: IChannelRepository;
    let mockRepository: MockChannelRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteChannelByIdService,
                MockChannelRepository,
                { 
                    provide: IChannelRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteChannelByIdService);
        repository      = module.get(IChannelRepository);
        mockRepository  = module.get(MockChannelRepository);
    });

    describe('main', () => 
    {
        test('DeleteChannelByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete channel and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ChannelId(channels[0].id)
            )).toBe(undefined);
        });
    });
});