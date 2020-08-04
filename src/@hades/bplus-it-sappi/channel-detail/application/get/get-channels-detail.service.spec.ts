import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetChannelsDetailService } from './get-channels-detail.service';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';
import { MockChannelDetailRepository } from './../../infrastructure/mock/mock-channel-detail.repository';

describe('GetChannelsDetailService', () => 
{
    let service: GetChannelsDetailService;
    let repository: IChannelDetailRepository;
    let mockRepository: MockChannelDetailRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetChannelsDetailService,
                MockChannelDetailRepository,
                { 
                    provide: IChannelDetailRepository,
                    useValue: {
                        get: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(GetChannelsDetailService);
        repository      = module.get(IChannelDetailRepository);
        mockRepository  = module.get(MockChannelDetailRepository);
    });

    describe('main', () => 
    {
        test('GetChannelsDetailService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should get channelsDetail', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main([])).toBe(mockRepository.collectionSource);
        });
    });
});