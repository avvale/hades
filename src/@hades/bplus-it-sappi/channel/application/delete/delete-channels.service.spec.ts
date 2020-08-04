import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteChannelsService } from './delete-channels.service';
import { IChannelRepository } from './../../domain/channel.repository';
import { MockChannelRepository } from './../../infrastructure/mock/mock-channel.repository';

describe('DeleteChannelsService', () => 
{
    let service: DeleteChannelsService;
    let repository: IChannelRepository;
    let mockRepository: MockChannelRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteChannelsService,
                MockChannelRepository,
                { 
                    provide: IChannelRepository,
                    useValue: {
                        get: (queryStatements) => {},
                        delete: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteChannelsService);
        repository      = module.get(IChannelRepository);
        mockRepository  = module.get(MockChannelRepository);
    });

    describe('main', () => 
    {
        test('DeleteChannelsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete channel and emit event', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main([])).toBe(undefined);
        });
    });
});